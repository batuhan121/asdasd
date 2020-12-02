const Discord = require('discord.js'); 
const db = require('quick.db'); 

exports.run = async (client, message, args, params) => { 
  
const filtreler = await db.fetch(`filtreK_${message.guild.id}_${args[0]}`)
  
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`); 
    
  if (!args[0]) return message.reply(`Lütfen yasaklamak istediğiniz kelimeyi giriniz`)
  if(filtreler == args[0]) return message.channel.send(`Zaten böyle bir filtre eklenmiş`)
    
  if (client.commands.get(args[0])) return message.reply(`Botun komudunu yasaklayamazsın.`)
  if (client.aliases.get(args[0])) return message.reply(`Botun komudunu yasaklayamazsın.`)
  
  //db.set(`komutkomuts_${message.guild.id}`, db.has(`komutkomuts_${message.guild.id}`) ? db.fetch(`komutkomuts_${message.guild.id}`) + 1 : 1)
  /*var i = db.set(`komutkomut_${message.guild.id}_${s}`, args[0])
  var a = db.set(`cevapcevap_${message.guild.id}_${s}`, args.slice(1).join(' '))*/
  
 let kelimeler = args[0]
  
  var a = db.push(`filtre_${message.guild.id}`, kelimeler)
 // db.set(`filtreK_${message.guild.id}_${args[0]}`, args[0])
  db.set(`filtreAK_${message.guild.id}`, "açık");
  //var a = db.push(`aciklama_${message.guild.id}`, args.slice(1).join(' '))

    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
  
   .setDescription(`Filtre eklendi.`) 
    message.channel.send(embed)
  
};

exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  aliases: ['filtreekle', 'filtre-oluştur'], 
  permLevel: 4,
  kategori: "moderasyon",
 
}; 

exports.help = { 
  name: 'filtre-ekle', 
  description: 'Sunucuda bir kelimyei yasaklarsınız.', 
  usage: 'filtre-ekle <kelime>',
  
};