require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const logger = require('node-color-log');

const client = new Discord.Client()
client.commands = new Discord.Collection();
const config = require('./config.js')


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
  logger.debug(`Commande ${command.name} chargée !`)
}


client.on('ready', () => {
  logger.info(`${client.user.tag} est en ligne !`);
  logger.info(`Victoire passe en ligne sur ${client.guilds.cache.size} serveurs`)
  client.user.setActivity(`sur ${client.guilds.cache.size} serveurs !`);
  setInterval(function(){ client.user.setActivity(`sur ${client.guilds.cache.size} serveurs !`); }, 3000);
})

client.on('message', message => {
  if (!message.content.startsWith(config.defaultSettings.prefix) || message.author.bot){
    interact(message, client);
    return;
  }

	const args = message.content.slice(config.defaultSettings.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
})


client.login(process.env.TOKEN);











/* ------- Functions -------- */

function interact(message, client) {
  if(message.author.bot) {
    return
  }
  logger.warn('IA Called');
  const msg = message.content.toLowerCase()
  if(!msg) {
    logger.warn('IA Stopped');
    return;
  }
  
  if(!config.ia.capable.includes(msg)) {
    logger.error('IA Cannot')
    logger.warn('IA Stopped');
    return
  }
  if(msg === "salut") message.reply('Salut !');
  logger.warn('IA Stopped');
}