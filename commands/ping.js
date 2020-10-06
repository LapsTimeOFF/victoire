const config = require('../config.js');
const Discord = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: 'ping',
  description: 'Permet de connaître les latence.',
  aliases: ['p', 'ping'],
  args: false,
  isOnlyAdmin: false,
  usage: '_ping',
	async execute(client, message, args) {
    const moment = require("moment");
require("moment-duration-format");
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    logger.info(`Commande ping executé par ${message.author.tag}`)
    message.channel.send(`Pong :ping_pong: ! Latence du :robot: : \`${Math.sqrt(((new Date() - message.createdTimestamp)/(5*2))**2)}ms\` Latence de <:discord:762258018372550666> : \`${client.ws.ping}ms\` Uptime : \`${duration}\``)
  }
}