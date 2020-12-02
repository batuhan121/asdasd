const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/sKanal.json", "utf8"));

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
 let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  
  if(args[0] === 'kapat') {
   if (db.has(`dKanal_${message.guild.id}`) === true) {
     message.channel.send(`Davet kanalı başarıyla kaldırıldı`)
     db.delete(`dKanal_${message.guild.id}`)
     return
}
  message.channel.send(`Davet kanalı ayarlanmamış.`)
    return
  
  }
    
  
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply(`Lütfen ayarlamak istediğiniz kanalı etiketleyiniz. Örnek **${prefix}davet-kanal-ayarla #kanal**`)
    }

    /*if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            sayacKanal: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/sKanal.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })*/
  
    db.set(`dKanal_${message.guild.id}`, channel.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`${client.emojis.get(client.emojiler.evet)} Davet kanalı ayarlandı: ${channel}\nDavet kanalını kapatmak isterseniz **${prefix}davet-kanal kapat** yazmanız yeterlidir.`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davet-kanal-belirle', 'davet-kanal'],
    permLevel: 4,
    kategori: "ayarlar",
}

exports.help = {
    name: 'davet-kanal-ayarla',
    description: 'Davet kanalını ayarlar.',
    usage: 'davet-kanal-ayarla <#kanal>',
}