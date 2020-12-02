const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let rol = JSON.parse(fs.readFileSync("././jsonlar/otoR.json", "utf8"));

exports.run = async (client, message, args) => {
   
  const db = require('quick.db');
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  let channel = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '))
  
   if(args[0] === 'kapat') {
   if (db.has(`destekK_${message.guild.id}`) === true) {
     message.channel.send(`Destek kanalı başarıyla kaldırıldı`)
     db.delete(`destekK_${message.guild.id}`)
     return
}
  message.channel.send(`Destek kanalı ayarlanmamış.`)
    return
   }
  
  if (db.has(`destekR_${message.guild.id}`) === false) return message.channel.send(`Bu ayarı kullanmanız için önce destek rol ayarlamanız gerekmektedir.`)
  
    if (!channel) {
        return message.reply("Destek kanalı olarak ayarlamak istediğiniz kanalı etiketleyiniz!")
    }
  
     db.set(`destekK_${message.guild.id}`, channel.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Destek kanalı başarıyla ${channel} olarak ayarlandı!\nDestek kanalını kapatmak isterseniz **${prefix}destek-kanal kapat** yazmanız yeterlidir.`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['destek-kanal'],
    permLevel: 4,
    kategori: "ayarlar"
}

exports.help = {
    name: 'destek-kanal-ayarla',
    description: 'Otomatik rol kayıtlarının gönderileceği kanalı ayarlar.',
    usage: 'destek-kanal-ayarla [#kanal/kanal adı]'
}