const config = require('../config.js');
const Discord = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: config.command.help.name,
  description: config.command.help.description,
  aliases: ['help', 'h'],
  args: false,
  isOnlyAdmin: false,
  usage: config.command.help.usage,
	execute(client, message, args) {
    logger.info(`Commande HELP executé par ${message.author.tag}`)
    if(args[0] === 'info') {
      message.reply(config.command.help.info)
      return
    }
    const embed = new Discord.MessageEmbed()
      .setColor('#9593')
      .setTitle('Commande help')
      .setDescription("Voici toutes les commandes :")
      .setFooter(`Demandé par : ${message.author.tag} Victoire® 2020-2020 | ${config.victoire.version}`, message.author.avatarURL())
      .setTimestamp();
		for (let item of client.commands) {
      item[1].aliases ? 
        embed.addField(`${config.defaultSettings.prefix}${item[1].usage}`, `${item[1].description} \n Aliases : ${item[1].aliases} ${item[1].isOnlyAdmin ? '\nUniquement pour les administrateurs' : ''}`, false) : embed.addField(`${config.defaultSettings.prefix}${item[1].usage}`, item[1].description, false);
    }
    message.channel.send(embed)
  }
}