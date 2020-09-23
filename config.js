
const config = {
  defaultSettings: {
    prefix: "_",
    modLogChannelID: "757177884862316641",
    modRole: "Modérateur",
    adminRole: "Créateur",
    testRole: "Testeur",
    systemNotice: true
  },
  ia: {
    capable: [
      'salut',
      'sv',
      'sa vas',
      'sa va',
      'ca vas',
      'ca va',
      'ça vas',
      'ça va'
    ]
  },
  command: {
    feedback: {
      name: 'feedback',
      description: 'Permet de donner un retour !',
      usage: '_feedback [<bug, fonction, info>] [<Retour>]',
      usage_error: '```css\n[Usage : \'_feedback [<bug, fonction, info>] [<Retour>]\']```',
      info: `\`\`\`Nom: 'feedback'\nDescription: 'Permet de donner un retour !'\nUsage: '_feedback [<bug, fonction, info>] [<Retour>]'\`\`\``,
      feedback_channel_id: '757232726293217451'
    },
    qrcode: {
      name: 'qrcode',
      description: 'Permet de crée un QrCode',
      usage: '_qrcode [<lien>]',
      usage_error: '```css\n[Usage : \'_qrcode [<lien>]\']```',
      info: `\`\`\`Nom: 'qrcode'\nDescription: 'Permet de crée un QrCode'\nUsage: '_qrcode [<lien>]'\`\`\``,
    },
    help: {
      name: 'help',
      description: 'Permet de recevoir toutes les commandes !',
      usage: '_help',
      info: `\`\`\`Nom: 'help'\nDescription: 'Permet de recevoir toutes les commandes !'\nUsage: '_help'\`\`\``,
    }
  },
  victoire: {
    version: `Alpha 0.0.2`
  }
  /*permLevels: [
    { level: 0, name: "User", check: () => true },
    {
      level: 1,
      name: "Modo",
      check: message => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()),
          if(modRole && message.member.roles.has(modRole.id)) return true;
        } catch(e) {
          return false;
        }
      }
    },
    {
      level: 2,
      name: "Admin",
      check: message => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase()),
          if(adminRole && message.member.roles.has(adminRole.id)) return true;
        } catch(e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "Victoire",
      check: message => message.client.appInfo.owner.id === message.author.id
    }
  ]*/
}

module.exports = config;