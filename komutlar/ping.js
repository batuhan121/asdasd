const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {
  
  const db = require('quick.db');
  
  var m = await message.channel.send(`${client.emojis.get(client.emojiler.yukleniyor)} Lütfen bekleyin veriler çekiliyor`)

  setTimeout(() => {
    const pingozel = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`Gecikme süreleri`, client.user.avatarURL)
    .setDescription('Mesaj Gecikmesi: {ping1} milisaniye \nBot Gecikmesi: {ping2} milisaniye'.replace("{ping1}", new Date().getTime() - message.createdTimestamp).replace("{ping2}", client.ping))
    return m.edit(pingozel)
     }, 3000)
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gecikme', 'gecikme-süresi'],
  permLevel: 0,
  kategori: "genel",

};

exports.help = {
  name: 'ping',
  description: 'Botun gecikme süresini gösterir.',
  usage: 'ping',

};
