require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const logger = require('node-color-log');
const mysql = require('mysql')

logger.info('Connection : En cours')

let sql;
const info = new mysql.createConnection({
  host: '192.168.1.71',
  password: '',
  user: 'root',
  database: 'victoire'
})
info.connect(function(err) {
  if(err) {
    logger.info('Connection : Fail')
    throw err;
  }

  logger.info('Connection : OK')
})
const client = new Discord.Client()
client.commands = new Discord.Collection();
const config = require('./config.js')




const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
if(commandFiles <= 0) {
  logger.info('Aucune commande trouvée.')
}
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
  logger.info(`Commande ${command.name} chargee !`)
}


client.on('ready', async () => {
  logger.info(`${client.user.tag} est en ligne !`);
  logger.info(`Victoire passe en ligne sur ${client.guilds.cache.size} serveurs`)
  logger.debug(`Version : ${config.victoire.version}`)
  client.user.setActivity(`sur ${client.guilds.cache.size} serveurs ! | ${config.victoire.version}`);
  let myGuild = client.guilds.cache.get('760170490785431573')
  let SendChannel = myGuild.channels.cache.get('762248904359411742')
  let SendChannel2 = myGuild.channels.cache.get('760170801625432104')
  SendChannel2.bulkDelete('10')
  SendChannel2.send(`@everyone ---------------------RÈGLES DU SERVEUR---------------------
  1-Partie Chat
         - Essayer au maximum de parler avec respect avec les autres joueurs.
         - Insulter est strictement interdit et détecté automatiquement.
         - Pas de publicité pour un serveur.
         - Les liens sont strictement interdit.
  SANCTION POUR LA PARTIE 1 :
        -Avertissement
        -3 avertissement : mute pendant 1440 Minutes ( 24 heure )
        -Si retour après mute et ensuite recommence, Ban de 3 jours
        -Si après ban de 3 jours vous continuez a ne pas respecter les règles, BAN PERMANNANT (Ban a VIE)
  Double Compte, message privé (DM), et publicité
        -Les doubles compte : Ne sont pas autoriser (Sauf staff)
        -Les publicité sont autorisé UNIQUEMENT si @Kisado31 et @LapsTime vous on autorisé.
        -Toute les règle énnoncer AVANT compte pour les DM
        -Sanction : Ban direct
  Si vous êtes victime d'une personne ne respectant pas les règles, n'hésiter pas a me DM avec preuve
  Cocher :white_check_mark: quand vous avez lu ses règles`).then(m => m.react('✅'))

  let OpenTicket = new Discord.MessageEmbed()
      .setDescription('Réagi  🎟️ pour ouvrir un ticket')
  await SendChannel.bulkDelete(1)
  await SendChannel.send(OpenTicket).then(m => m.react('🎟️'))
  setInterval(function(){ client.user.setActivity(`sur ${client.guilds.cache.size} serveurs ! | ${config.victoire.version}`); }, 3000);
})

client.on('message', message => {
  if(message.author.bot) return;
  info.query(`SELECT * FROM user WHERE user = ${message.author.id}`, async (err, req) => {
    if(err) {
      logger.info('Error DataBase Communication.')
      throw err;
    }

    if(req.length < 1) {
      message.author.send('Bonjour, vu que vous êtes nouveau dans notre base de donées nous allons vous enregistrer dans la base de données.')
      //INSERT
      sql = `INSERT INTO user (user, username, message) VALUES ('${message.author.id}', '${message.author.username}', '${message.content}')`
      info.query(sql, function(err) {
        if(err) {
          logger.info('Error DataBase Communication.')
          throw err;
        }
      })
    } else {
      return;
    }
    
  });

  if (!message.content.startsWith(config.defaultSettings.prefix)){
    censure(message, client);
    //interact(message, client);
    return;
  }

	const args = message.content.slice(config.defaultSettings.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if(!command) {
    message.delete()
    message.reply('Commande non trouvé !').then(m => m.delete({ timeout: 3000 }))
    return
  }
  if(command.isOnlyAdmin && !message.member.roles.cache.find(role => role.name === config.defaultSettings.adminRole)) {
    message.reply('Cette commande est réservé aux administrateur !').then(m => m.delete({timeout:3000}))
    return
  }
  try {
    command.execute(client, message, args, info);
  } catch (error) {
    console.error(error);
    message.reply('Une erreur est survenue.');
  }
})





client.on('messageReactionAdd', async(reaction, user) => {
    const message = reaction.message;
    const member = message.guild.members.cache.get(user.id);

    if(user.bot) return;

    if(
      ['🎟️', '🔒', '❎', '✅'].includes(reaction.emoji.name)
    ) {
      switch(reaction.emoji.name) {

        case '🎟️':
          if(!reaction.message.channel.id === '762248904359411742') return;

          reaction.users.remove(user);

          let username = user.username;
          let categoryID = '762252662062055424';
          let channel = await message.guild.channels.create(`ticket-${username}`, {type: 'text', parent: message.guild.channels.cache.get(categoryID)})
          .catch(err => {
            console.log(err);
            message.guild.channels.cache.get(config.defaultSettings.modLogChannelID).send('Erreur survenue [Event : MessageReactionAdd]')
          })

          channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
          channel.updateOverwrite(member, {
            'VIEW_CHANNEL': true,
            'SEND_MESSAGE': true,
            'ADD_REACTIONS': true
          });
          channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == 'SUPPORT'), {
            'VIEW_CHANNEL': true,
            'SEND_MESSAGE': true,
            'ADD_REACTIONS': true
          });

          var embed1 = new Discord.MessageEmbed()
          .setTitle('Salut,')
          .setDescription('Explique ton problème ici')

          channel.send(`${member}`)
          await channel.send(embed1).then(m => m.pin()).then(async msg => msg.react('🔒'))

          let logchannel = message.guild.channels.cache.find(c => c.id == config.defaultSettings.modLogChannelID)
          var embedlog1 = new Discord.MessageEmbed()
          .setTitle('Ticket')
          .setThumbnail(user.avatarURL())
          .setDescription(`Ticket-${username} vien d'être crée ! ${channel}`)
          .setColor('#00ff00');
          logchannel.send(embedlog1)
        break;
        
        case '🔒':
          reaction.users.remove(user)
          if(!message.channel.name.startsWith('ticket')) return;
          if(!member.hasPermission('ADMINISTRATOR')) return;

          let logchannel2 = message.guild.channels.cache.find(c => c.id == config.defaultSettings.modLogChannelID)
          var embedlog2 = new Discord.MessageEmbed()
          .setTitle('Ticket')
          .setThumbnail(user.avatarURL())
          .setDescription(`${message.channel.name} vien d'être vérouillé !`)
          .setColor('#ffff00');
          logchannel2.send(embedlog2)
          message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == 'SUPPORT'), {
            'VIEW_CHANNEL': true,
            'SEND_MESSAGE': true,
            'ADD_REACTIONS': true
          });
          var embed3 = new Discord.MessageEmbed()
          .setTitle('Est tu sûr ?')
          .setDescription('De vouloir fermer le salon ?')
          message.channel.send(embed3).then(async m => await m.react('✅').then(m2 => m.react('❎')))
        break;

        case '❎':
          reaction.users.remove(user)
          reaction.message.delete()
          let logchannel3 = message.guild.channels.cache.find(c => c.id == config.defaultSettings.modLogChannelID)
          var embedlog3 = new Discord.MessageEmbed()
          .setTitle('Ticket')
          .setThumbnail(user.avatarURL())
          .setDescription(`${message.channel.name} vien d'être dévérouillé !`)
          .setColor('#00ff00');
          logchannel3.send(embedlog3)
        break;

        case '✅':
          if(reaction.message.channel.id === '760170801625432104') {
            reaction.users.remove(user);
            member.roles.add('762013060814602310')
            return
          }
          reaction.users.remove(user)
          message.channel.send('Le salon va se suprimé dans 10 secondes !')
          let logchannel4 = message.guild.channels.cache.find(c => c.id == config.defaultSettings.modLogChannelID)
          var embedlog4 = new Discord.MessageEmbed()
          .setTitle('Ticket')
          .setThumbnail(user.avatarURL())
          .setDescription(`${message.channel.name} vien d'être suprimé !`)
          .setColor('#ff0000');
          logchannel4.send(embedlog4)
          setTimeout(() => {
            message.channel.delete()
          }, 10000)
        break;
      }
    }
})

client.on('guildBanAdd', async(guild, user) => {
  let logchannel = guild.channels.cache.find(c => c.id == config.defaultSettings.modLogChannelID)
  console.log(user);
})







client.login(process.env.TOKEN_BOT);











/* ------- Functions -------- */

function interact(message, client) {
  if(message.author.bot) {
    return
  }
  logger.warn('IA Called');
  const msg = message.content.toLowerCase()
  if(!msg) {
    logger.warn('IA Stopped');
    return;
  }
  
  if(!config.ia.capable.includes(msg)) {
    logger.error('IA Cannot')
    logger.warn('IA Stopped');
    return
  }
  if(msg === "salut") message.reply('Salut !');
  if(msg === "sv") message.reply('Oui et toi ?');
  if(msg === "sa vas") message.reply('Oui et toi ?');
  if(msg === "ca vas") message.reply('Oui et toi ?');
  if(msg === "ça vas") message.reply('Oui et toi ?');
  if(msg === "sa va") message.reply('Oui et toi ?');
  if(msg === "ca va") message.reply('Oui et toi ?');
  if(msg === "ça va") message.reply('Oui et toi ?');
  logger.warn('IA Stopped');
}


function censure(message, client) {

  if(message.author.bot) return;
  for (let item of config.ia.censure) {
      if(message.content.includes(item)) {
        message.delete();
        message.reply(`Surveille ton language ! Censure appliqué : ${message.author.tag}, mot censuré interdit : ***~~__${item}__~~***`).then(m => m.delete({timeout: 3000}))
        message.guild.channels.cache.get(config.defaultSettings.modLogChannelID).send(`Surveille ton language ! Censure appliqué : ${message.author.tag}, mot censuré interdit : ***~~__${item}__~~***`)
      }
    }
  } 