const Discord = require('discord.js');
const db = require('quick.db');
const math = require('math-expression-evaluator')
const moment = require("moment");
require("moment-duration-format");
exports.run = async (client, message, args) => {
  let u = message.mentions.users.first() || message.author;


let pref = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  let a = args[0];
  let a2 = args[1];
  let g = await db.has(`giris_${u.id}`)
  let ç = await db.has(`cikis_${u.id}`)
  const embed = new Discord.RichEmbed()

    const embed21 = new Discord.RichEmbed()
  .setDescription(`${u.username} Adlı oyuncunun giriş çıkışı başarıyla sıfırlandı!`)
  .setColor('RANDOM')
  message.channel.send(embed21)
  
  db.delete(`giris_${u.id}`)
  db.delete(`cikis_${u.id}`)
  db.delete(`tümgirisler_${u.id}`)
  db.delete(`girisler_${u.id}`)
  return
  
  
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
  kategori: "rehber"
};

exports.help = {
  name: 'gçsil',
  description: 'Rehberlerin giriş çıkışları için bir komut',
  usage: ''
};