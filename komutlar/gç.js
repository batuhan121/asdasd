const Discord = require('discord.js');
const db = require('quick.db');
const math = require('math-expression-evaluator')
const moment = require("moment");
require("moment-duration-format");
exports.run = async (client, message, args) => {

  if(message.channel.id === '768811412046348298') {
  let u = message.mentions.users.first() || message.author;

  const onay = client.emojis.find(emoji => emoji.id === client.emojiler.evet)
  const hayır = client.emojis.find(emoji => emoji.id === client.emojiler.hayır)

let pref = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  let a = args[0];
  let a2 = args[1];
  let g = await db.has(`giris_${u.id}`)
  let ç = await db.has(`cikis_${u.id}`)
  const embed = new Discord.RichEmbed()
if(args[0] == 'bak') {

  const embed21 = new Discord.RichEmbed()
  .setTitle(`${u.username} Adlı Oyuncunun Giriş Çıkışı`)
  .setThumbnail(u.avatarURL)
  .setDescription(`Giriş: **${db.fetch(`giris_${u.id}`) || `${hayır} Giriş Bulunamadı`}**\nÇıkış: **${db.fetch(`cikis_${u.id}`) || `${hayır} Çıkış Bulunamadı`}**\n\n**Tüm Girişler**:\n **${db.fetch(`girisler_${u.id}`) || 'Bulunamadı'}**`)
  .setColor('RANDOM')
  message.channel.send(embed21)
  return

};
  
  
if(args[0] == 'tüm') {

  const embed21 = new Discord.RichEmbed()
  .setTitle(`Son Giriş Çıkışlar`)
  .setDescription(`__${db.fetch(`gçtime_776758229723512832`) || hayır} __**Bendis** ${db.fetch(`giris_776758229723512832`) || hayır} | ${db.fetch(`cikis_776758229723512832`) || hayır}\n __${db.fetch(`gçtime_485765513369354240`) || hayır}__ **Carrix** ${db.fetch(`giris_485765513369354240`) || hayır} | ${db.fetch(`cikis_485765513369354240`) || hayır}\\n__${db.fetch(`gçtime_587672675757981744`) || hayır}__ **YTMFurkan** ${db.fetch(`giris_587672675757981744`) || hayır} | ${db.fetch(`cikis_587672675757981744`) || hayır}\n__${db.fetch(`gçtime_558889254168559617`) || hayır}__ **Enesgkky** ${db.fetch(`giris_558889254168559617`) || hayır} | ${db.fetch(`cikis_558889254168559617`) || hayır}\n__${db.fetch(`gçtime_453281256457895939`) || hayır}__ **Ruthless** ${db.fetch(`giris_453281256457895939`) || hayır} | ${db.fetch(`cikis_453281256457895939`) || hayır}\n`)
  .setColor('RANDOM')
  message.channel.send(embed21)
  return

};
  
  
if(args[0] == 'giriş' || args[0] == 'çıkış') {
 
  if(args[0] == 'giriş') {
  const embed21 = new Discord.RichEmbed()
  .setTitle(`${message.author.username} Giriş`)
  .setThumbnail(u.avatarURL)
  .addField(`Giriş:`,`${args[1]}`)
  .setTimestamp()
  .setColor('00f400')
  var tarih2 = [moment().format('DD-MM-YYYY')]
  db.set(`gçtime_${message.author.id}`, tarih2)
  db.set(`giris_${message.author.id}`, args[1])
  message.channel.send(onay + 'Giriş saatin kayıt edildi **çıkışını** unutma! ve **çıkış** saatini **sıfırladım**.')
  message.guild.channels.get('780154192647684126').send(embed21)
  db.delete(`cikis_${message.author.id}`)
  return
  }

  if(args[0] == 'çıkış'){

    if(!g) return message.channel.send(hayır + 'Oyuna girmeden çıkış saatinimi yazıcaksın?')
    const embed21 = new Discord.RichEmbed()
    .setTitle(`${message.author.username} Çıkış`)
    .setThumbnail(u.avatarURL)
    .addField(`Çıkış:`,`${args[1]}`)
    .setTimestamp()
    .setColor('ff0000')
  
    var tarih2 = [moment().format('DD-MM-YYYY')]
    db.set(`gçtime_${message.author.id}`, tarih2)
    var tarih = [moment().format('DD-MM-YYYY')]
    let girişler = `${tarih} > ${db.fetch(`giris_${message.author.id}`)} ${args[1]}\n`
    var girisler = db.push(`girisler_${message.author.id}`, girişler)

    db.set(`cikis_${message.author.id}`, args[1])
    message.channel.send(onay + 'Çıkış saatin kayıt edildi')

    message.guild.channels.get('780154192647684126').send(embed21)

    return
    
  }

} else {
  const embed21 = new Discord.RichEmbed()
  .setDescription('Giriş veya çıkışını belirtmedin Örenk\nGiriş İçin: **!gç giriş 12:00**\nÇıkış İçin: **!gç çıkış 21:00**')
  .setColor('RANDOM')
  message.channel.send(embed21)
  return
  
}
  } else {

    message.channel.send('Bu komutu bu kanalda kullanamazsın!')
    return 
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['giriş', 'çıkış', 'gç'],
  permLevel: 1,
  kategori: "rehber"
};

exports.help = {
  name: 'girişçıkış',
  description: 'Rehberlerin giriş çıkışları için bir komut',
  usage: ''
};