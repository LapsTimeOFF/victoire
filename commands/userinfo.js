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
	async execute(client, message, args) {
    logger.info(`Commande ${'userinfo'.toLowerCase()} executé par ${message.author.tag}`)
    
    if(!args[0]) {
      let embed = new MessageEmbed()
      .setTitle('UserInfo')
      .setDescription(`Voici des information sur : ${message.author.nickname ? message.author.nickname : message.author.username}`)
      .addField(`Nom d\'utilisateur : ${message.author.username}`)
      .setFooter(`Demandé par : ${message.author.nickname ? message.author.nickname : message.author.username}#${message.author.discriminator} ${config.victoire.version} | Alpha 0.0.2`, message.author.avatarURL());
      message.channel.send(embed)
    }
  }
}