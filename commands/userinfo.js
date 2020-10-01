const config = require('../config.js');
const {MessageEmbed} = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: 'userinfo',
  description: 'Permet d\'avoir des informations sur quel\'q\'un ou soit même.',
  aliases: ['userinfo', 'ui'],
  args: false,
  isOnlyAdmin: false,
  usage: '_userinfo',
	async execute(client, message, args, db) {
    logger.info(`Commande ${'userinfo'.toUpperCase()} executé par ${message.author.tag}`)
    
      const member = message.mentions.members.first() || message.guild.members.cache.get(message.author.id)
      db.query(`SELECT * FROM user WHERE user = ${member.id}`, async (err, req) => {
        if(err) {
          logger.db('Error DataBase Communication.')
          throw err;
        }
        let embed = new MessageEmbed()
      .setTitle('UserInfo')
      .setDescription(`Voici des information sur : ${member.user.username}`)
      //.setThumbnail(member.avatarURL())
      .addField(`Nom d\'utilisateur :`, member.user.username)
      .addField(`Discriminateur : `, member.user.discriminator)
      .addField('ID :', member.id)
      .addField('Information dans la base de donnée :', '------------------------------------------------')
      .addField(`Nom d'utilisateur enregisté :`, `${username(req)}`)
      .addField(`ID enregisté :`, `${user(req)}`)
      .addField(`Status enregisté :`, `${messageget(req)}`)
      .setFooter(`Demandé par : ${message.author.nickname ? message.author.nickname : message.author.username}#${message.author.discriminator} ${config.victoire.version} | Alpha 0.0.2`, message.author.avatarURL());
      message.channel.send(embed)
      
      });
  }
}

function username(req){
  //console.log(req[0].username);
  if(req <= 1) {
    return 'Aucune valeur enregistré'
  } else {
    return req[0].username
  }
}
function user(req){
  if(req <= 1) {
    return 'Aucune valeur enregistré'
  } else {
    return req[0].user
  }
}
function messageget(req){
  if(req <= 1) {
    return 'Aucune valeur enregistré'
  } else {
    return req[0].message
  }
}