const config = require('../config.js');
const Discord = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: 'stop',
  description: 'Permet de stopper le robot.',
  aliases: ['s', 'stop'],
  args: false,
  isOnlyAdmin: true,
  usage: '_stop',
	async execute(client, message, args) {
    logger.info(`Commande STOP executé par ${message.author.tag}`)
    
    message.delete()
    client.destroy();
    await process.exit(100)
  }
}