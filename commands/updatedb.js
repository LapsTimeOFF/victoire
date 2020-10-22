const config = require('../config.js');
const logger = require('node-color-log');

module.exports = {
	name: 'updatedb',
  description: 'Permet de mettre à jour la base de données.',
  aliases: ['updatedb', 'udb'],
  args: true,
  isOnlyAdmin: false,
  usage: '_updatedb',
	async execute(client, message, args, db) {
    message.reply('Commande déactivé temporairement')
    // let reason = args.slice(0).join(" ");
    // sql = `UPDATE \`user\` SET \`message\` = '${reason}' WHERE \`user\`.\`user\` = '${message.mentions.users.first() ? message.mentions.users.first().id : message.author.id}';`
    //   db.query(sql, function(err) {
    //     if(err) {
    //       logger.db('Error DataBase Communication.')
    //       message.reply('Une érreur de comunication est survenu avec la base de données.')
    //       throw err;
    //     }
    //     db.query(`SELECT * FROM user WHERE user = ${message.mentions.users.first() ? message.mentions.users.first().id : message.author.id}`, async (err, req) => {
    //       if(err) {
    //         logger.db('Error DataBase Communication.')
    //         message.reply('Une érreur de comunication est survenu avec la base de données.')
    //         throw err;
    //       }
    //       if(req <= 1) {
    //         logger.db('Error DataBase Communication.')
    //         message.reply('Une érreur de comunication est survenu avec la base de données.')
    //         return
    //       }
    //       if(!req[0].message === reason) {
    //         logger.db('Error DataBase Communication.')
    //         message.reply('Une érreur de comunication est survenu avec la base de données.')
    //         return
    //       }
    //       message.channel.send(`Base de données mise à jour ! Nouveau status : \`\`${req[0].message}\`\``)
    //     });
    //   });
  }
};