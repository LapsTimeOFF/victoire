const config = require('../config.js');
const Discord = require('discord.js')

module.exports = {
	name: config.command.help.name,
  description: config.command.help.description,
  usage: config.command.help.usage,
	execute(client, message, args) {
    if(args[0] === 'info') {
      message.reply(config.command.help.info)
      return
    }
    const embed = new Discord.MessageEmbed()
      .setColor('#9593F5')
      .setTitle('Commande help')
      .setDescription("Voici toutes les commandes :")
      .setFooter(`Demandé par : ${message.author.tag} Victoire® 2020-2020 | ${config.victoire.version}`, message.author.avatarURL())
      .setTimestamp();
		for (let item of client.commands) {
      embed.addField(`${config.defaultSettings.prefix}${item[1].usage}`, item[1].description, false);
    }
    message.channel.send(embed)
  }
}