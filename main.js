require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const logger = require('node-color-log');

const client = new Discord.Client()
client.commands = new Discord.Collection();
const config = require('./config.js')


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
  logger.debug(`Commande ${command.name} chargee !`)
}


client.on('ready', () => {
  logger.info(`${client.user.tag} est en ligne !`);
  logger.info(`Victoire passe en ligne sur ${client.guilds.cache.size} serveurs`)
  logger.debug(`Version : ${config.victoire.version}`)
  client.user.setActivity(`sur ${client.guilds.cache.size} serveurs ! | ${config.victoire.version}`);
  setInterval(function(){ client.user.setActivity(`sur ${client.guilds.cache.size} serveurs ! | ${config.victoire.version}`); }, 3000);
})

client.on('message', message => {
  if (!message.content.startsWith(config.defaultSettings.prefix) || message.author.bot){
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
    command.execute(client, message, args);
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
          if(!reaction.message.channel.id === '759779260029337610') return;

          reaction.users.remove(user);

          let username = user.username;
          let categoryID = '759793557631926273';
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
          message.channel.send(user + ', OK bonne continuation !')
          let logchannel3 = message.guild.channels.cache.find(c => c.id == config.defaultSettings.modLogChannelID)
          var embedlog3 = new Discord.MessageEmbed()
          .setTitle('Ticket')
          .setThumbnail(user.avatarURL())
          .setDescription(`${message.channel.name} vien d'être dévérouillé !`)
          .setColor('#00ff00');
          logchannel3.send(embedlog3)
        break;

        case '✅':
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








client.login(process.env.TOKEN);











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
  /* 
  if(message.author.bot) return;
  for (let item of config.ia.censure) {
    const arg = message.content.trim().split(/ +/);
    for (let args of arg) {
      console.log(args);
      if(args.includes(item)) {
        logger.info(`Censure appliqué : ${message.author.tag}, mot censuré interdit : ${args}`)
        message.delete();
        message.reply('Surveille ton language !').then(m => m.delete({timeout: 3000}))
      }
    }
  } */
}