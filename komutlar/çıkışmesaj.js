const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  

    let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let cM = args.slice(0).join(' ');
  
  if (!cM) {
        return message.reply("Çıkış mesajı ayarlamak istediğiniz mesajı yazmalısınız! \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}**, sunucu isminin geleceği yere **{sunucu}** veya sunucudaki kişi sayısının geleceği yere **{kişisayısı}** yazınız.")
    }
  

    /*if(!gMesaj[message.guild.id]){
        gMesaj[message.guild.id] = {
            gm: gM
        };
    }
    fs.writeFile("././jsonlar/girisM.json", JSON.stringify(gMesaj), (x) => {
        if (x) console.error(x)
      })*/
  
  
 

    if(args[0] === 'kapat') {
   if (db.has(`cikisM_${message.guild.id}`) === true) {
     message.channel.send(`Çıkış mesajı başarıyla kaldırıldı`)
     db.delete(`cikisM_${message.guild.id}`)
     return
}
  message.channel.send(`Giriş mesajı ayarlanmamış.`)
    return
  
  }
    
  
    var s = db.set(`cikisM_${message.guild.id}`, cM)
  
    const embed = new Discord.RichEmbed()

    .setDescription(`${client.emojis.get(client.emojiler.evet)} Çıkış mesajı başarıyla ayarlandı ${cM}\Çıkış mesajını kapatmak için **${prefix}çıkış-mesaj kapat** yazmanız yeterlidir.`)
    .setColor("RANDOM")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['çıkış-mesaj'],
    permLevel: 4,
    kategori: "ayarlar",
  };

  exports.help = {
    name: 'çıkış-mesaj-ayarla',
    description: 'Çıkış mesajını değiştirmenizi sağlar.',
    usage: 'çıkış-mesaj-ayarla <mesaj> \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}** yazınız aksi taktirde kişiyi göstermez.',
    
  };