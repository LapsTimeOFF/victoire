require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`${client.user.tag} est en ligne`);
})

client.login(process.env.TOKEN);