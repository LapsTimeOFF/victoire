const config = require('../config.js');
const Discord = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: config.command.feedback.name,
  description: config.command.feedback.description,
  usage: config.command.feedback.usage,
	execute(message, args) {
    logger.info(`Commande FEEDBACK executé par ${message.author.tag}`)
		if(!args[0]) {
      message.reply('Veuillez sélectioner un type de retour !')
      message.reply(config.command.feedback.usage_error)
      return
    }
    if(args[0] === 'info') {
      message.reply(config.command.feedback.info);
      return
    }
    let reason = args.slice(1).join(" ");
    if(!reason) {
      message.reply('Veuillez choisir une raison pour le retour !')
      message.reply(config.command.feedback.usage_error)
      return
    }
    if(args[0] === "fonction" || args[0] === "bug") {
      message.delete()
      let reportChannel = message.guild.channels.cache.find(x => x.id === config.command.feedback.feedback_channel_id);
      message.channel.send('Votre retour a été déposé auprès de l\'équipe du personnel. Merci d\'avoir aidé le bot à s\'améliorer !').then(m => m.delete({timeout: 15000}));
      const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#365fe8')
      .setTitle('/!\\ Retour ! /!\\ '.toUpperCase())
      .setDescription("Un retour a été déposé !")
      .addField('Déposeur : ', `${message.author}`, true)
      .addField('Type : ', `${args[0]}`, true)
      .addField('Info donné : ', `${reason}`, true)
      .setFooter(`Victoire® 2020-2020 | ${config.victoire.version}`)
      .setTimestamp();
    reportChannel.send(exampleEmbed);
    }
	},
};