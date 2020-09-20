require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client()

const config = require('./config.js')

client.on('ready', () => {
  log(`${client.user.tag} est en ligne !`);
  client.user.setActivity(`sur ${client.guilds.cache.size} serveurs !`);
  setInterval(function(){ client.user.setActivity(`sur ${client.guilds.cache.size} serveurs !`); }, 3000);
})

client.login(process.env.TOKEN);

function log(msg) {
  let date = Date.now()
  let date = Date(date)
  console.log(`${date} §aLOG`);
}