const config = require('../config.js');
const Discord = require('discord.js')
const logger = require('node-color-log');

module.exports = {
	name: config.command.purge.name,
  description: config.command.purge.description,
  aliases: ['purge'],
  args: false,
  isOnlyAdmin: true,
  usage: config.command.purge.usage,
	async execute(client, message, args) {
    logger.info(`Commande purge executé par ${message.author.tag}`)
    message.delete()
    const amount = args[0]
    if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error

if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1

await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
  message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
)});
  }
}