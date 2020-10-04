const config = require('../config.js');
const Discord = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: config.command.openticket.name,
  description: config.command.openticket.description,
  aliases: ['openticket', 'ot'],
  args: false,
  isOnlyAdmin: true,
  usage: config.command.openticket.usage,
	execute(client, message, args) {
    logger.info(`Commande OpenTicket executé par ${message.author.tag}`)
    
    message.delete()
    let myGuild = client.guilds.cache.get('760170490785431573')
    let SendChannel = myGuild.channels.cache.get('762248904359411742')
    let OpenTicket = new Discord.MessageEmbed()
      .setDescription('Réagi  🎟️ pour ouvrir un ticket')
      SendChannel.send(OpenTicket).then(m => m.react('🎟️'))
  }
}