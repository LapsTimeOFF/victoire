const config = require('../config.js');
const Discord = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: config.command.qrcode.name,
	description: config.command.qrcode.description,
	aliases: ['qr', 'qrcode'],
  usage: config.command.qrcode.usage,
	execute(message, args) {
		logger.info(`Commande QRCODE executé par ${message.author.tag}`)
		if(!args[0]) {
      message.reply('Veuillez entrer une URL !')
      message.reply(config.command.qrcode.usage_error)
      return
    }
    if(args[0] === 'info') {
      message.reply(config.command.qrcode.info);
      return
    }
    let URL = args.slice(0).join(" ");
    const urlqrcode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${URL}`
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#15985F')
	.setTitle('QR Code')
	.setURL(urlqrcode)
	.setAuthor(`Victoire® 2020-2020 | ${config.victoire.version}`)
	.setDescription('Voici votre Qr Code')
	.setThumbnail(urlqrcode)
	.addFields(
		{ name: '\u200B', value: '\u200B' },
	)
	.setImage(urlqrcode)
	.setTimestamp()
	.setFooter(`Demandé par ${message.author.tag}`, `${message.author.avatarURL()}`);

message.channel.send(exampleEmbed);
	},
};