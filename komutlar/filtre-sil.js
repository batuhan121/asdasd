const Discord = require('discord.js'); 
const db = require('quick.db'); 

exports.run = async (client, message, args, params) => { 
  
const s = await db.fetch(`filtre_${message.guild.id}`);
const prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
const argss = args[0]
  
  
//if(s === null) return message.channel.send('Sunucunuzda hiç eklenmiş filtre bulunmuyor.')
  //if(s.length <= 0) return message.channel.send('Bu sunucuda filtre bulunmuyor.')
 
 

  if(db.fetch(`filtre_${message.guild.id}`) === null || db.fetch(`filtre_${message.guild.id}`).length <= 0) { message.channel.send('Sunucunuzda hiç eklenmiş filtre bulunmuyor.') } else {
  
 if(!args[0]) return message.channel.send(`Silmek istediğiniz filtreyi girmeniz gerek örnek: **${prefix}filtre-sil <silmek istediğiniz filtre>**\nEğer eklediğiniz filtreleri hatırlamıyorsanız **${prefix}filtre-liste** yazarak görebilirsiniz.`)
  
      if (!db.fetch(`filtre_${message.guild.id}`).includes(args[0])) return message.reply("Sunucuda böyle bir filtre bulunmuyor")

    
let x = args[0] 
let arr = []
db.fetch(`filtre_${message.guild.id}`).forEach(v => {
if (v !== x) {
arr.push(v)
}
})
  

db.set(`filtre_${message.guild.id}`, arr)

    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
   .setDescription(`Sunucudaki **${args[0]}** filtresi silindi`) 
    message.channel.send(embed)
  }
    
  

};

exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  aliases: ['filtresil'], 
  permLevel: 4,
  kategori: "moderasyon",
 
}; 

exports.help = { 
  name: 'filtre-sil', 
  description: 'Sunucudan istediğiniz bir filtreyi silersiniz.', 
  usage: 'filtre-sil',
  
};