const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message, args) => {
  if(message.channel.id !== "763532507466825739") { 
    message.delete(5000)
    message.channel.send('Bu komutu sadece <#763532507466825739> kanalında kullanabilirsin!').then(msg => msg.delete(5000));
    return
  }
  if(!args[0]) return message.channel.send('Lütfen birşey yaz!!').then(msg => msg.delete(5000));


  if(args.slice(0).join(" ").includes('@everyone')) return message.channel.send('**Lütfen düzgün birşey yaz!**').then(msg => msg.delete(5000));
  if(args.slice(0).join(" ").includes('@here')) return message.channel.send('**Lütfen düzgün birşey yaz!**').then(msg => msg.delete(5000));
  if(args.slice(0).join(" ").includes('@&')) return message.channel.send('**Lütfen düzgün birşey yaz!**').then(msg => msg.delete(5000));

  message.delete()

  const onay = client.emojis.find(emoji => emoji.id === client.emojiler.evet)
  const hayır = client.emojis.find(emoji => emoji.id === client.emojiler.hayır)
  var yazı = args.slice(0).join(" ")
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor('Site İçin Tıkla ', `${client.user.avatarURL}`, `https://solidcraft.tk/`)
    .setThumbnail(message.author.avatarURL)
    .addField(`Kullanıcı`, `<@${message.author.id}> [${message.author.username}]`, true)
    .addField(`İD`, `${message.author.id}`, true)
    .addField(`Öneri`, yazı)
    .setDescription(`Öneri vermek için \`!öneri <öneriniz>\``)
    .setFooter('SolidCraft', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(message.author.username +' Önerin gönderildi!').then(msg => msg.delete(5000));
    message.guild.channels.get('783742454200533012').send(embed).then(function(message) {

      message.react(onay);
      
      message.react(hayır);
      
      });
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['öneri', 'istek'],
  permLevel: 0,
  kategori: "genel",

};

exports.help = {
  name: 'öneri',
  description: '',
  usage: 'öneri',

};
