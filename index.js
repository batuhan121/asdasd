// ıkarken yapılacaklar

const express = require("express");
const http = require("http");
const app = express();

app.get("/", (request, response) => {
  //console.log(Date.now() + " BOT Aktif.");
  //response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_NAME}.glitch.me`);
}, 1000 * 60 * 3);


if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const { RichEmbed } = require('discord.js');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require('chalk');
const fs = require('fs');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const ms = require('ms')

const db = require('quick.db');
const jimp = require('jimp');
const Jimp = require('jimp')
const snekfetch = require('snekfetch');
const useful = require('./x.js');



let komutum = JSON.parse(fs.readFileSync("./komutlar.json", "utf8"));

client.cmdd = komutum



client.useful = useful;
require('./util/eventLoader')(client);
client.config = require("./config.js");
client.emojiler = {

  "gold": "699110694934544426", //?PARAM DAKİ ALTIN EMOJİSİ      
  "paraGitti": "776066649329238036", // X İŞARETİ          //tm
  "paraGitmedi": "776066600931426306", // TİK İŞARETİ      //tamam
  "paraROZET": "699109869810221067", // PARA İLE ALINAN YILDIRIM ROZET EMOJİSİ  
  "onayRozet": "699109560706793544", // ONAY ROZETİ
  "modRozet": "699109131176378388", // MOD ROZETİ
  "yetkiliRozet": "699109430175858698", // YETKİLİ ROZETİ
  "destekçiRozet": "699109738578837544",
  "evet": "776066600931426306", // TİK İŞARET       //tamam
  "hayır": "776066649329238036", // X İŞARETİ   //tm
  "kendineParaYollama": "699113232463429632", // KENDİNE PARA ATMAYA ÇALIŞANLAR İÇİN SİNİRLİ EMOJİSİ      
  "konfeti": "699113978533642240", // MESLEK SAHİBİ OLUNCA RENGARENK KONFETİ ATIYOR  
  "yukleniyor": "695944805569527878", // YÜKLENİYOR EMOJİ İŞTE :D     
  "sinirli": "699113232463429632", // TİTREYEN SİNİRLİ :D       
  "mutlu": "699113408930250752", // MUTLU EMOJİ                   
  "rahatsızetme": "695939227749449758", // RAHATSIZ ETMEYİN EMOJİSİ    
  "çevrimiçi": "695939194698203158", // ÇEVRİMİÇİ EMOJİSİ  
  "yayıncı": "695939122753175562", // YAYINCI EMOJİSİ 
  "çevrimdışı": "695939161613533264", // ÇEVRİM DIŞI EMOJİSİ  
  "boşta": "695939259885944872", // BOŞTA EMOJİSİ     
  "bot": "695939328471334933", // BOT EMOJİSİ          
  "polis": "699113534918754356", // POLİS EMOJİ   
  "Yvar": "776066600931426306", // YETKİLERİM KOMUDUNDAKİ TİK İŞARETİ //tamam
  "Yyok": "776066649329238036", // YETKİLERİM KOMUDUNDAKİ X İŞARETİ  //tamam
  "yan": "699113722454605824", // > GİBİ EMOJİ İŞTE :ç
  "kalpSarılmalı": "699113833196683329",
  "olumlu": "",
  "olumsuz": "",

  // AYARLAR KOMUDUNDAKİ AÇIK KAPALI EMOJİLERİ >>>>>>>>>>>>>>>>>
  "kapalıA": "776066649329238036",
  "açıkA": "776066600931426306",

  // AÇIK BONUS EMOJİLERİ -------------- >>>>>>>>>>

  "açıkB": "699111546693091339", // B
  "açıkO": "699111722530635786", // O
  "açıkN": "699111862322593812", // N
  "açıkU": "699112038105874442", // U
  "açıkS": "699112155487797288", // S

  // KAPALI BONUS EMOJİLERİ ---------------- >>>>>>>>>>>>>

  "kapalıO": "699112312337989653", // O
  "kapalıN": "699112540654796841", // N
  "kapalıU": "699112638705303652", // U
  "kapalıS": "699112727913693224", // S
}

client.ayarlar = {
  "oynuyor": "oyna.solidcraft.tk | https://solidcraft.tk",
  "yenilik": "",
  "official_sahip": "581506750579081245",
  "sahip": ['581506750579081245', "", ""],
  "yardimcilar": [''],
  "isim": "SolidCraft",
  "botD": "https://solidcraft.tk",
  "webS": "https://solidcraft.tk",
  "web": "https://solidcraft.tk",
  "dblO": "",
  "dbl": "",
  "dbltoken": "",
  "versiyon": "1.0.0",
  "prefix": "!",
  "renk": "DARKBLUE",
  "version": "1.0.0",
};
client.avatarURL = ``
const ayarlar = client.ayarlar;

client.tr = require('./tr.js');
client.en = require('./en.js');

//var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${chalk.yellow(`»`)} ${message}`);
};



client.ayar = db;


client.on("message", async message => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.reply(`${client.emojis.get(client.emojiler.evet)} Başarıyla afk modundan çıktınız.`);
  }
  
  var USER = message.mentions.users.first();
  if(!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);
  
  if(REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    message.channel.send(`${client.emojis.get(client.emojiler.hayır)} ${USER.tag} kullanıcısı AFK\n AFK süresi: ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s\nSebep:\n **${REASON}**` )
  }
});

client.on("message", async message => {

if(message.channel.id == "763532421458690118") {

    if(message.author.id == "763536847309635615") 
 return   

 const onay = client.emojis.find(emoji => emoji.id === client.emojiler.evet)
 const hayır = client.emojis.find(emoji => emoji.id === client.emojiler.hayır)
  message.delete()
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`Oylama`)
  .setDescription(`**${message}**\n\nBu oylama ${message.author.username} tarafından oluşturuldu`)
  .setTimestamp()
  message.channel.send(embed).then(function(message) {

    message.react(onay);
    
    message.react(hayır);
    
    });
  return
}
return
});




client.on("ready", async () => {

  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  console.log(`ZAKTİFİZ BEAAAAAAA`)
  client.user.setStatus("online");
  client.user.setActivity(client.ayarlar.oynuyor, { type: 'WATCHING' });

})

client.on('ready', async () => {
      setInterval(async () => {
        try {
          const fetched = await client.channels.find('id', '695332436699250749').fetchMessages({ limit: 100 });
          const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

          await client.channels.find('id', '695332436699250749').bulkDelete(notPinned, true);
        } catch (err) {
          console.error(err);
        }
  }, ms('15m'));
});

client.on('ready', async () => {
      setInterval(async () => {
        try {
          const fetched = await client.channels.find('id', '701810452551696464').fetchMessages({ limit: 100 });
          const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

          await client.channels.find('id', '701810452551696464').bulkDelete(notPinned, true);
        } catch (err) {
          console.error(err);
        }
  }, ms('20m'));
});



/*
client.on('guildMemberAdd', async member => {
 
  //	let kanal = await db.fetch(`hgKanal2_${member.guild.id}`)
   //  if (!kanal) return
  const Canvas = require('canvas')
	const canvas = Canvas.createCanvas(900, 280);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://pngimg.com/uploads/alien/alien_PNG103.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.user.tag}`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.user.tag}`, canvas.width / 3.7, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL || member.user.defaultAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'MEETRHosgeldin.png');

	member.guild.channels.get('531535859594297364').send(`Sunucuya hoşgeldin, ${member}!`, attachment);
});


client.on('guildMemberRemove', async member => {
  
	//let kanal = await db.fetch(`hgKanal2_${member.guild.id}`)
    //if (!kanal) return
    const Canvas = require('canvas')
	const canvas = Canvas.createCanvas(900, 280);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://pngimg.com/uploads/alien/alien_PNG103.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.user.tag}`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.user.tag}`, canvas.width / 3.7, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL || member.user.defaultAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'MEETRGuleGule.png');

	member.guild.channels.get('531535859594297364').send(`Güle güle, **${member.user.tag}**`, attachment);
});


const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 54;

    do {
  
    ctx.font = `${fontSize -= 2}px Helvetica`;
    } while (ctx.measureText(text).width > canvas.width - 111);

    return ctx.font;
};

*/



client.on('guildMemberAdd', member => {
  try {
    if (db.has(`dKanal_${member.guild.id}`) === true) {
      member.guild.fetchInvites().then(guildInvites => {
        if (member.user.bot) return
        const ei = invites[member.guild.id];

        invites[member.guild.id] = guildInvites;

        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

        const inviter = client.users.get(invite.inviter.id);

        const kanal = member.guild.channels.get(db.fetch(`dKanal_${member.guild.id}`));

        kanal.send(`\`${member.user.tag}\` adlı kullanıcı \`${inviter.tag}\` adlı kullanıcının ${invite.code} linkine sahip daveti ile sunucuya katıldı!`);



      });
    } else {
      return
    }
  } catch (err) {
    return
  }
});


const AntiSpam = require("./spamkorumasi.js");
const cooldown = new Set();

client.on("message", msg => {
  if (client.user.id == msg.author.id) return;
  AntiSpam(client, msg);
  if (cooldown.has(msg.author.id)) {
    return;
  }
})

/*
client.on("message", async message => {
  var s = "tr";

  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
  }
  const dil = client[s];

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message
      .reply(`${client.emojis.get(client.emojiler.evet)} ${dil.afk.cikis}`)
      .then(message => message.delete(7000));
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    if (db.has(`üyelikk_${USER.id}`)) {
      message.delete();
      const embed = new Discord.RichEmbed()
        .setColor("RANDOM")

        .setDescription(
          `<a:mor:690267218856116457><a:yesil:690267180801065251>\`${USER.tag}\` Adlı Gold üyeyi rahatsız edemezsiniz.<a:yesil:690267180801065251><a:mor:690267218856116457>\nAFK süresi: \`${timeObj.hours}\`** saat** \`${timeObj.minutes}\`** dakika** \`${timeObj.seconds}\` ** saniye**\nSebep:\n\`${REASON}\``
        );

      message.channel.send(embed).then(message => message.delete(7000));
    } else
      message.channel
        .send(
          `\`${USER.tag}\` kullanıcısı AFK\nAFK süresi: \`${timeObj.hours}\`** saat** \`${timeObj.minutes}\`** dakika** \`${timeObj.seconds}\` ** saniye**\nSebep:\n\`${REASON}\` `
        )
        .then(message => message.delete(7000));
  }
});
*/

client.on('guildCreate', async guild => {
  var konum = ''
  if (guild.region === "russia") {
    var konum = '_Rusya_ :flag_ru:'
  }
  if (guild.region === "us-west") {
    var konum = '_Batı Amerika_ :flag_us: '
  }
  if (guild.region === "us-south") {
    var konum = '_Güney Amerika_ :flag_us: '
  }
  if (guild.region === "us-east") {
    var konum = '_Doğu Amerika_ :flag_us: '
  }
  if (guild.region === "us-central") {
    var konum = '_Amerika_ :flag_us: '
  }
  if (guild.region === "brazil") {
    var konum = '_Brezilya_ :flag_br:'
  }
  if (guild.region === "singapore") {
    var konum = '_Singapur_ :flag_sg:'
  }
  if (guild.region === "sydney") {
    var konum = '_Sidney_ :flag_sh:'
  }
  if (guild.region === "eu-west") {
    var konum = '_Batı Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-south") {
    var konum = '_Güney Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-east") {
    var konum = '_Doğu Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-central") {
    var konum = '_Avrupa_ :flag_eu:'
  }
  if (guild.region === "hongkong") {
    var konum = '_Hong Kong_ :flag_hk: '
  }
  if (guild.region === "japan") {
    var konum = '_Japonya_ :flag_jp:'
  }
  var tarih = ''
  if (moment(guild.createdAt).format('MM') === '01') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ocak ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '02') {
    var tarih = `${moment(guild.createdAt).format('DD')} Şubat ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '03') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mart ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '04') {
    var tarih = `${moment(guild.createdAt).format('DD')} Nisan ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '05') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mayıs ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '06') {
    var tarih = `${moment(guild.createdAt).format('DD')} Haziran ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '07') {
    var tarih = `${moment(guild.createdAt).format('DD')} Temmuz ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '08') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ağustos ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '09') {
    var tarih = `${moment(guild.createdAt).format('DD')} Eylül ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '10') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ekim ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '11') {
    var tarih = `${moment(guild.createdAt).format('DD')} Kasım ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '12') {
    var tarih = `${moment(guild.createdAt).format('DD')} Aralık ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }


  var guildhook = new Discord.WebhookClient("551481876062273570", "3DnJc2MXtFgtNYTyE93c3Lw3o9GQjzTf-gHb-cE1RzPGxP_KyW5Z6Iun5hNoIPdZR062")
  //https://discordapp.com/api/webhooks/551481876062273570/3DnJc2MXtFgtNYTyE93c3Lw3o9GQjzTf-gHb-cE1RzPGxP_KyW5Z6Iun5hNoIPdZR062

  const server = new RichEmbed()
    .setColor('GREEN')
    .setThumbnail(guild.iconURL || guild.defaultİconURL)
    .setTitle(`${guild.name} Adlı Sunucuya Eklendim!`, guild.iconURL || guild.defaultİconURL)
    .setDescription(`Toplam **${client.guilds.size}** sunucudayım!`)
    .addField(`» Sunucu Bilgileri:`, stripIndents `
   Sunucu Adı: _${guild.name}_
   Sunucu Kimliği/ID: _${guild.id}_
   Sunucunun Kurulduğu Tarih: _${tarih}_
   Sunucunun Konumu: ${konum}
   Sunucu Sahibi: _${guild.owner.user.username}#${guild.owner.user.discriminator}_
   Sunucu Sahibi Kimliği/ID: _${guild.owner.user.id}_
   Sunucudaki Toplam Kullanıcı Sayısı: _${guild.members.size}_
   Sunucudaki İnsan Sayısı: _${guild.members.filter(m => !m.user.bot).size}_
   Sunucudaki Bot Sayısı: _${guild.members.filter(m => m.user.bot).size}_
  `)
    .setFooter(`${client.user.username} | Sunucu İzleyici`, client.user.avatarURL)
  guildhook.send(server);
})

client.on("guildDelete", async guild => {
  var konum = ''
  if (guild.region === "russia") {
    var konum = '_Rusya_ :flag_ru:'
  }
  if (guild.region === "us-west") {
    var konum = '_Batı Amerika_ :flag_us: '
  }
  if (guild.region === "us-south") {
    var konum = '_Güney Amerika_ :flag_us: '
  }
  if (guild.region === "us-east") {
    var konum = '_Doğu Amerika_ :flag_us: '
  }
  if (guild.region === "us-central") {
    var konum = '_Amerika_ :flag_us: '
  }
  if (guild.region === "brazil") {
    var konum = '_Brezilya_ :flag_br:'
  }
  if (guild.region === "singapore") {
    var konum = '_Singapur_ :flag_sg:'
  }
  if (guild.region === "sydney") {
    var konum = '_Sidney_ :flag_sh:'
  }
  if (guild.region === "eu-west") {
    var konum = '_Batı Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-south") {
    var konum = '_Güney Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-east") {
    var konum = '_Doğu Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-central") {
    var konum = '_Avrupa_ :flag_eu:'
  }
  if (guild.region === "hongkong") {
    var konum = '_Hong Kong_ :flag_hk: '
  }
  if (guild.region === "japan") {
    var konum = '_Japonya_ :flag_jp:'
  }
  var tarih = ''
  if (moment(guild.createdAt).format('MM') === '01') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ocak ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '02') {
    var tarih = `${moment(guild.createdAt).format('DD')} Şubat ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '03') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mart ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '04') {
    var tarih = `${moment(guild.createdAt).format('DD')} Nisan ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '05') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mayıs ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '06') {
    var tarih = `${moment(guild.createdAt).format('DD')} Haziran ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '07') {
    var tarih = `${moment(guild.createdAt).format('DD')} Temmuz ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '08') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ağustos ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '09') {
    var tarih = `${moment(guild.createdAt).format('DD')} Eylül ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '10') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ekim ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '11') {
    var tarih = `${moment(guild.createdAt).format('DD')} Kasım ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '12') {
    var tarih = `${moment(guild.createdAt).format('DD')} Aralık ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }



  var guildhook = new Discord.WebhookClient("551481876062273570", "3DnJc2MXtFgtNYTyE93c3Lw3o9GQjzTf-gHb-cE1RzPGxP_KyW5Z6Iun5hNoIPdZR062")
  // https://discordapp.com/api/webhooks/538374610669010954/BcMbfOHukB1iyyy-lFYPbUkjm1VdcDxOdRS35urWLkqjOnM5reZ6duYmW5yaudgGpVDx
  const server = new RichEmbed()
    .setColor('RED')
    .setThumbnail(guild.iconURL || guild.defaultİconURL)
    .setTitle(`${guild.name} Adlı Sunucudan Atıldım!`, guild.iconURL || guild.defaultİconURL)
    .setDescription(`Toplam **${client.guilds.size}** sunucudayım!`)
    .addField(`» Sunucu Bilgileri:`, stripIndents `
   Sunucu Adı: _${guild.name}_
   Sunucu Kimliği/ID: _${guild.id}_
   Sunucunun Kurulduğu Tarih: _${tarih}_
   Sunucunun Konumu: ${konum}
   Sunucu Sahibi: _${guild.owner.user.username}#${guild.owner.user.discriminator}_
   Sunucu Sahibi Kimliği/ID: _${guild.owner.user.id}_
   Sunucudaki Toplam Kullanıcı Sayısı: _${guild.members.size}_
   Sunucudaki İnsan Sayısı: _${guild.members.filter(m => !m.user.bot).size}_
   Sunucudaki Bot Sayısı: _${guild.members.filter(m => m.user.bot).size}_
  `)
    .setFooter(`${client.user.username} | Sunucu İzleyici`, client.user.avatarURL)
  guildhook.send(server);
})

client.on("message", async msg => {





  const prefix = await db.fetch(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(' ');
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);




  if (!msg.guild) return;

  if (msg.author.bot) return;


  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        let y = await msg.channel.send(
          `Hey <@${msg.author.id}>, Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`
        );
        y.delete(5000);
        return;
      }
    }
  }


  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    const kufur = new RegExp(/(göt|amk|aq|orospu|oruspu|oç|oc|sik|fuck|yarrak|piç|amq|amcık|çocu|sex|seks|amına|sg|siktir git)/)
    if (kufur.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete()
        msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(`Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`)
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }


  if (db.has(`linkE_${msg.guild.id}`) === true) {
    const reklam = new RegExp(/(com|.com|www|dicord.gg|.tk|.pw|https:|http:|.info|.cf|gg|.net|.me|www.|WWW.|.COM|.NET|.TK|DİSCORD.GG|.PW)/)
    if (reklam.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete()
        msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("link Engeli!")
          .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`)
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }





})


client.on("messageUpdate", async (msg) => {

  const prefix = await db.fetch(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(' ');
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);


  if (fAK == 'açık') {




    const fltr = filtre
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete()

        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Filtre Sistemi")
          .setDescription(`Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`)
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }



  if (!msg.guild) return;

  if (msg.author.bot) return;


  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (mesaj.member.permissions.has("ADMINISTRATOR") === true) return;
      msg.delete();
      let y = await msg.reply(`Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`)
      y.delete(5000);
      return
    };
  };


  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    const kufur = new RegExp(/(göt|amk|aq|orospu|oruspu|oç|oc|sik|fuck|yarrak|piç|amq|amcık|çocu|sex|seks|amına|sg|siktir git)/)
    if (kufur.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete()
        msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(`Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`)
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }


  if (db.has(`linkE_${msg.guild.id}`) === true) {
    const reklam = new RegExp(/(com|.com|www|dicord.gg|.tk|.pw|https:|http:|.info|.cf|gg|.net|.me|www.|WWW.|.COM|.NET|.TK|DİSCORD.GG|.PW)/)
    if (reklam.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete()
        msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("link Engeli!")
          .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`)
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }


});

const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
  if (!events.hasOwnProperty(event.t)) return;
  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel = client.channels.get(data.channel_id) || await user.createDM();
  if (channel.messages.has(data.message_id)) return;
  const message = await channel.fetchMessage(data.message_id);
  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  const reaction = message.reactions.get(emojiKey);
  client.emit(events[event.t], reaction, user);
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id == "700306531262005289") { //Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.id == "686125859165306926") { //Dilediğini emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Top Lane')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126143174082587") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Mid Lane')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126107652653143") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Jungle')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126212229234727") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Adc')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126248849965150") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Support')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
  }
});


client.on('messageReactionRemove', (reaction, user) => {
  if (reaction.message.id == "700306531262005289") { //Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.id == "686125859165306926") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Top Lane')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126143174082587") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Mid Lane')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126107652653143") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Jungle')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126212229234727") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Adc')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "686126248849965150") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Support')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
  }
});


client.on("message", async message => {

  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM")
      message.channel.send({ embed })
      message.guild.owner.send({ embed })
      db.delete(`sayac_${message.guild.id}`)
    }
  }
})



client.on('guildCreate', async guild => {
  var konum = ''
  if (guild.region === "russia") {
    var konum = '_Rusya_ :flag_ru:'
  }
  if (guild.region === "us-west") {
    var konum = '_Batı Amerika_ :flag_us: '
  }
  if (guild.region === "us-south") {
    var konum = '_Güney Amerika_ :flag_us: '
  }
  if (guild.region === "us-east") {
    var konum = '_Doğu Amerika_ :flag_us: '
  }
  if (guild.region === "us-central") {
    var konum = '_Amerika_ :flag_us: '
  }
  if (guild.region === "brazil") {
    var konum = '_Brezilya_ :flag_br:'
  }
  if (guild.region === "singapore") {
    var konum = '_Singapur_ :flag_sg:'
  }
  if (guild.region === "sydney") {
    var konum = '_Sidney_ :flag_sh:'
  }
  if (guild.region === "eu-west") {
    var konum = '_Batı Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-south") {
    var konum = '_Güney Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-east") {
    var konum = '_Doğu Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-central") {
    var konum = '_Avrupa_ :flag_eu:'
  }
  if (guild.region === "hongkong") {
    var konum = '_Hong Kong_ :flag_hk: '
  }
  if (guild.region === "japan") {
    var konum = '_Japonya_ :flag_jp:'
  }
  var tarih = ''
  if (moment(guild.createdAt).format('MM') === '01') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ocak ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '02') {
    var tarih = `${moment(guild.createdAt).format('DD')} Şubat ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '03') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mart ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '04') {
    var tarih = `${moment(guild.createdAt).format('DD')} Nisan ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '05') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mayıs ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '06') {
    var tarih = `${moment(guild.createdAt).format('DD')} Haziran ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '07') {
    var tarih = `${moment(guild.createdAt).format('DD')} Temmuz ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '08') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ağustos ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '09') {
    var tarih = `${moment(guild.createdAt).format('DD')} Eylül ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '10') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ekim ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '11') {
    var tarih = `${moment(guild.createdAt).format('DD')} Kasım ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '12') {
    var tarih = `${moment(guild.createdAt).format('DD')} Aralık ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }

  var guildhook = new Discord.WebhookClient("699895950612758558", "qN3xPUPk81UtRhQKBUEG1HvgCg2jz5a5RAjoEmTVHcjl3d0ATSlyFq_saELzBkO_tM-E")
  const server = new RichEmbed()
    .setColor('0x36393F')
    .setThumbnail(guild.iconURL || guild.defaultİconURL)
    .setTitle(`${guild.name} Adlı Sunucuya Eklendim!`, guild.iconURL || guild.defaultİconURL)
    .setDescription(`Toplam **${client.guilds.size}** sunucudayım!`)
    .addField(`» Sunucu Bilgileri:`, stripIndents `
   Sunucu Adı: _${guild.name}_
   Sunucu Kimliği/ID: _${guild.id}_
   Sunucunun Kurulduğu Tarih: _${tarih}_
   Sunucunun Konumu: ${konum}
   Sunucu Sahibi: _${guild.owner.user.username}#${guild.owner.user.discriminator}_
   Sunucu Sahibi Kimliği/ID: _${guild.owner.user.id}_
   Sunucudaki Toplam Kullanıcı Sayısı: _${guild.members.size}_
   Sunucudaki İnsan Sayısı: _${guild.members.filter(m => !m.user.bot).size}_
   Sunucudaki Bot Sayısı: _${guild.members.filter(m => m.user.bot).size}_
  `)
    .setFooter(`${client.user.username} | Sunucu İzleyici`, client.user.avatarURL)
  guildhook.send(server);
})

client.on("guildDelete", async guild => {
  var konum = ''
  if (guild.region === "russia") {
    var konum = '_Rusya_ :flag_ru:'
  }
  if (guild.region === "us-west") {
    var konum = '_Batı Amerika_ :flag_us: '
  }
  if (guild.region === "us-south") {
    var konum = '_Güney Amerika_ :flag_us: '
  }
  if (guild.region === "us-east") {
    var konum = '_Doğu Amerika_ :flag_us: '
  }
  if (guild.region === "us-central") {
    var konum = '_Amerika_ :flag_us: '
  }
  if (guild.region === "brazil") {
    var konum = '_Brezilya_ :flag_br:'
  }
  if (guild.region === "singapore") {
    var konum = '_Singapur_ :flag_sg:'
  }
  if (guild.region === "sydney") {
    var konum = '_Sidney_ :flag_sh:'
  }
  if (guild.region === "eu-west") {
    var konum = '_Batı Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-south") {
    var konum = '_Güney Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-east") {
    var konum = '_Doğu Avrupa_ :flag_eu:'
  }
  if (guild.region === "eu-central") {
    var konum = '_Avrupa_ :flag_eu:'
  }
  if (guild.region === "hongkong") {
    var konum = '_Hong Kong_ :flag_hk: '
  }
  if (guild.region === "japan") {
    var konum = '_Japonya_ :flag_jp:'
  }
  var tarih = ''
  if (moment(guild.createdAt).format('MM') === '01') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ocak ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '02') {
    var tarih = `${moment(guild.createdAt).format('DD')} Şubat ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '03') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mart ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '04') {
    var tarih = `${moment(guild.createdAt).format('DD')} Nisan ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '05') {
    var tarih = `${moment(guild.createdAt).format('DD')} Mayıs ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '06') {
    var tarih = `${moment(guild.createdAt).format('DD')} Haziran ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '07') {
    var tarih = `${moment(guild.createdAt).format('DD')} Temmuz ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '08') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ağustos ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '09') {
    var tarih = `${moment(guild.createdAt).format('DD')} Eylül ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '10') {
    var tarih = `${moment(guild.createdAt).format('DD')} Ekim ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '11') {
    var tarih = `${moment(guild.createdAt).format('DD')} Kasım ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(guild.createdAt).format('MM') === '12') {
    var tarih = `${moment(guild.createdAt).format('DD')} Aralık ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
  }

  var guildhook = new Discord.WebhookClient("699895950612758558", "qN3xPUPk81UtRhQKBUEG1HvgCg2jz5a5RAjoEmTVHcjl3d0ATSlyFq_saELzBkO_tM-E")
  const server = new RichEmbed()
    .setColor('0x36393F')
    .setThumbnail(guild.iconURL || guild.defaultİconURL)
    .setTitle(`${guild.name} Adlı Sunucudan Atıldım!`, guild.iconURL || guild.defaultİconURL)
    .setDescription(`Toplam **${client.guilds.size}** sunucudayım!`)
    .addField(`» Sunucu Bilgileri:`, stripIndents `
   Sunucu Adı: _${guild.name}_
   Sunucu Kimliği/ID: _${guild.id}_
   Sunucunun Kurulduğu Tarih: _${tarih}_
   Sunucunun Konumu: ${konum}
   Sunucu Sahibi: _${guild.owner.user.username}#${guild.owner.user.discriminator}_
   Sunucu Sahibi Kimliği/ID: _${guild.owner.user.id}_
   Sunucudaki Toplam Kullanıcı Sayısı: _${guild.members.size}_
   Sunucudaki İnsan Sayısı: _${guild.members.filter(m => !m.user.bot).size}_
   Sunucudaki Bot Sayısı: _${guild.members.filter(m => m.user.bot).size}_
  `)
    .setFooter(`${client.user.username} | Sunucu İzleyici`, client.user.avatarURL)
  guildhook.send(server);
})




client.on("guildMemberRemove", async member => {
  if (db.has(`sayac_${member.guild.id}`) === false) return
  if (db.has(`sKanal_${member.guild.id}`) === false) return
  const channel = db.fetch(`sKanal_${member.guild.id}`)
  member.guild.channels.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.members.size}\` üye kaldı!`)
})


//let ot = JSON.parse(fs.readFileSync("./jsonlar/otoR.json", "utf8"));


client.on("guildMemberAdd", async member => {

  if (!member.guild) return;

  let prefix = await db.fetch(`prefix_${member.guild.id}`) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`)
  if (!hgK) return;

  const giris = db.fetch(`girisM_${member.guild.id}`)

  member.guild.channels.get(hgK).send(db.has(`girisM_${member.guild.id}`) ? giris.replace('{kullanıcı}', `<@${member.user.id}>`).replace("{user}", `<@${member.user.id}>`).replace("{sunucu}", `**${member.guild.name}**`).replace("{kişisayısı}", `**${member.guild.members.size}**`) : `<@${member.user.id}> Katıldı! (\`giriş-mesaj-ayarla\` komutu ile mesajı değiştirilebilir.)`);
});

client.on("guildMemberRemove", async member => {

  if (!member.guild) return;

  let prefix = await db.fetch(`prefix_${member.guild.id}`) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`)
  if (!hgK) return;

  const cikis = db.fetch(`cikisM_${member.guild.id}`)

  member.guild.channels.get(hgK).send(db.has(`cikisM_${member.guild.id}`) ? cikis.replace('{kullanıcı}', `**${member.user.username}**`).replace("{user}", `**${member.user.username}**`).replace("{sunucu}", `**${member.guild.name}**`).replace("{kişisayısı}", `**${member.guild.members.size}**`) : `**${member.user.username}** Ayrıldı! (\`çıkış-mesaj-ayarla\` komutu ile mesaj değiştirilebilir.)`);
});



client.on("message", async message => {

  if (!message.guild) return;

  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  if (message.content.startsWith(prefix)) {
    let komutum = client.cmdd
    if (komutum[message.guild.id]) {
      for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
        if (message.content.slice(prefix.length) === Object.keys(komutum[message.guild.id][i])[0]) {

          message.channel.send(komutum[message.guild.id][i][Object.keys(komutum[message.guild.id][i])])

          return
        }
      }
    }
  }
});


client.on('message', async msg => {

  if (!msg.guild) return;

  let prefix = await db.fetch(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;

  if (!msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`))) return
  var s = 'tr'
  var r = 'Destek Ekibi'
  var k = 'destek-kanalı'
  if (db.has(`dil_${msg.guild.id}`) === true) {
    var s = 'en'
    var r = 'Support Team'
    var k = 'support-channel'
  }
  const dil = s

  let rol = '';
  let kanal = '';

  if (db.has(`destekK_${msg.guild.id}`) === true) {
    kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`)).name
  }

  if (db.has(`destekK_${msg.guild.id}`) === false) {
    kanal = k
  }

  if (db.has(`destekR_${msg.guild.id}`) === true) {
    rol = msg.guild.roles.get(db.fetch(`destekR_${msg.guild.id}`))
  }

  if (db.has(`destekR_${msg.guild.id}`) === false) {
    rol = r
  }

  const reason = msg.content.split(" ").slice(1).join(" ");
  if (msg.channel.name == kanal) {
    if (msg.author.bot) return;
    /*if (!msg.guild.roles.exists("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
            m2.delete(5000)});*/
    if (msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`)) {

      msg.author.send(client[dil].desteksistem.aciktalepozel.replace("{kisi}", msg.author.tag).replace("{kanal}", `${msg.guild.channels.get(msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`).id)}`))
      msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`).send(client[dil].desteksistem.aciktalep.replace("{kisi}", msg.author.tag).replace("{sebep}", msg.content))

      msg.delete()
      return
    }
    if (msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)) {
      msg.guild.createChannel(`${client[dil].desteksistem.talep}-${msg.author.discriminator}`, "text").then(c => {
        const category = msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)
        c.setParent(category.id)
        let role = msg.guild.roles.find(r => r.name === rol.name);
        let role2 = msg.guild.roles.find(r => r.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });

        const embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
          .setTitle(`_Merhaba ${msg.author.username}!_`)
          .addField(`» Destek Talebi Hakkında Bilgilendirme «`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}bitir\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`)
          .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
          .addField(`» Destek Talebini Açan Kullanıcı «`, `<@${msg.author.id}>`, true)
          .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
        c.send({ embed: embed });
        c.send(`** ${rol} | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
        msg.delete()
      }).catch(console.error);
    }
  }

  if (msg.channel.name == kanal) {
    if (!msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)) {
      msg.guild.createChannel(client[dil].desteksistem.kategori, 'category').then(category => {
        category.setPosition(1)
        let every = msg.guild.roles.find(c => c.name === "@everyone");
        category.overwritePermissions(every, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false,
          READ_MESSAGE_HISTORY: false
        })
        msg.guild.createChannel(`${client[dil].desteksistem.talep}-${msg.author.discriminator}`, "text").then(c => {
          c.setParent(category.id)
          let role = msg.guild.roles.find(c => c.name === rol.name);
          let role2 = msg.guild.roles.find(c => c.name === "@everyone");
          c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
          });
          c.overwritePermissions(msg.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });

          const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
            .setTitle(`_Merhaba ${msg.author.username}!_`)
            .addField(`» Destek Talebi Hakkında Bilgilendirme «`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}bitir\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`)
            .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
            .addField(`» Destek Talebini Açan Kullanıcı «`, `<@${msg.author.id}>`, true)
            .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
          c.send({ embed: embed });
          c.send(`** ${rol} | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
          msg.delete()
        }).catch(console.error);
      })
    }
  }
})

client.on('message', async message => {
  if (!message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`))) return

  if (!message.guild) return;

  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  var s = 'tr'
  var r = 'Destek Ekibi'
  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = 'en'
    var r = 'Support Team'
  }
  const dil = s

  if (message.content.toLowerCase().startsWith(prefix + `bitir`)) {
    if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);

    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Destek Talebi Kapatma İşlemi!`)
      .setDescription(`Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
      .setFooter(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
    message.channel.send({ embed })
      .then((m) => {
        message.channel.awaitMessages(response => response.content === 'evet', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit('Destek talebi kapatma isteği zaman aşımına uğradı.').then(m2 => {
              m2.delete()
            }, 3000);
          });
      });
  }



  //if (!message.guild) return;

  // let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;


  // const dil = s



});

///////////////////////////////////////-------> HG-BB ayarlamalı <-------////////////////////////////////////////

client.on('guildMemberAdd', async member => {
  db.fetch(`hgsistemi_${member.guild.id}`).then(x => {
    if (x == `acik`) {
  db.fetch(`dmmesaj_${member.guild.id}`).then(ozelhosgeldin =>{
  if (!ozelhosgeldin) return;
  member.send(ozelhosgeldin ? ozelhosgeldin.replace('-sunucu-', `${member.guild.name}`) .replace('-kullanıcı-',`${member.user.tag}`) .replace('-id-',`${member.user.id}`) : ``)
  })
    } else if (x == `kapali`) {
      
    }
  })
})

client.on('guildMemberRemove', async member => {
db.fetch(`hgsistemi_${member.guild.id}`).then(x => {
    if (x == `acik`) {
  db.fetch(`dmbbmesaj_${member.guild.id}`).then(ozelgorusuruz =>{
 if (!ozelgorusuruz) return;
  member.send(ozelgorusuruz ? ozelgorusuruz.replace('-sunucu-', `${member.guild.name}`) .replace('-kullanıcı-',`${member.user.tag}`) .replace('-id-',`${member.user.id}`) : ``)

})
    } else if (x == `kapali`) {
      
    }
  })
})


///////////////////////////////////////-------> HG-BB ayarlamalı <-------/////////////////////////////////////
//log sistemi

//let logA = JSON.parse(fs.readFileSync("./jsonlar/log.json", "utf8"));

client.on("guildMemberAdd", member => {

  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = ''
  if (moment(user.createdAt).format('MM') === '01') {
    var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '02') {
    var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '03') {
    var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '04') {
    var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '05') {
    var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '06') {
    var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '07') {
    var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '08') {
    var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '09') {
    var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '10') {
    var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '11') {
    var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '12') {
    var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }

  var tarih2 = ''
  if (moment(user.joinedAt).format('MM') === '01') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Ocak ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '02') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Şubat ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '03') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Mart ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '04') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Nisan ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '05') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Mayıs ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '06') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Haziran ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '07') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Temmuz ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '08') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Ağustos ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '09') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Eylül ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '10') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Ekim ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '11') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Kasım ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '12') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Aralık ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`))
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL)
  kanal.send(embed);

});

client.on("guildMemberRemove", member => {

  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = ''
  if (moment(user.createdAt).format('MM') === '01') {
    var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '02') {
    var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '03') {
    var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '04') {
    var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '05') {
    var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '06') {
    var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '07') {
    var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '08') {
    var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '09') {
    var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '10') {
    var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '11') {
    var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.createdAt).format('MM') === '12') {
    var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
  }

  var tarih2 = ''
  if (moment(user.joinedAt).format('MM') === '01') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Ocak ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '02') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Şubat ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '03') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Mart ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '04') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Nisan ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '05') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Mayıs ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '06') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Haziran ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '07') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Temmuz ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '08') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Ağustos ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '09') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Eylül ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '10') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Ekim ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '11') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Kasım ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }
  if (moment(user.joinedAt).format('MM') === '12') {
    var tarih2 = `${moment(user.joinedAt).format('DD')} Aralık ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`))
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL)
  kanal.send(embed);

});

const eventsss = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
  if (!eventsss.hasOwnProperty(event.t)) return;
  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel = client.channels.get(data.channel_id) || await user.createDM();
  if (channel.messages.has(data.message_id)) return;
  const message = await channel.fetchMessage(data.message_id);
  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  const reaction = message.reactions.get(emojiKey);
  client.emit(eventsss[event.t], reaction, user);
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id == "701865808632217661") { //Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.id == "701818065125638244") { //Dilediğini emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'League of Legends')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701818130170904656") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Counter Strike')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701824336587259907") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Minecraft')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701821228662521909") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Rocket League')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820593451827271") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Fortnite')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701823547223310357") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Valorant')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820440607457312") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Mobile Legends')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820766131322940") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'GTA')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701821062224019458") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Town of Salem')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701824216940544090") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'LoR')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820968267415684") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Pubg')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820643162718268") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Apex')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701818186554671284") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Roblox')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820882988826705") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Pubg Mobile')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701823621101781163") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'TFT')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701821131954454681") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Rainbow Six Siege')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
  }
});


client.on('messageReactionRemove', (reaction, user) => {
  if (reaction.message.id == "701865808632217661") { //Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.id == "701818065125638244") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'League of Legends')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701818130170904656") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Counter Strike')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701824336587259907") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Minecraft')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701821228662521909") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rocket League')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820593451827271") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Fortnite')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701823547223310357") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Valorant')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820440607457312") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Mobile Legends')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820766131322940") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'GTA')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701821062224019458") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Town of Salem')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820968267415684") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Pubg')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701824216940544090") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'LoR')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820643162718268") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Apex')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701818186554671284") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Roblox')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701820882988826705") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Pubg Mobile')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701823621101781163") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'TFT')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.id == "701821131954454681") { //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rainbow Six Siege')) //Dilediğiniz rolün adını yazabilirsiniz.
    }
  }
});

client.on("messageDelete", message => {

  if (message.author.bot) return;



  db.set(`atan_${message.channel.id}`, `${message.author.tag}`)
  db.set(`mesaj_${message.channel.id}`, message.content)

  //if (!logA[message.guild.id]) return;

  var user = message.author;

  //var kanal = message.guild.channels.get(logA[message.guild.id].log);

  if (db.has(`log_${message.guild.id}`) === false) return;

  var kanal = message.guild.channels.get(db.fetch(`log_${message.guild.id}`))
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("ID", message.author.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL)
  kanal.send(embed);

});

client.on("messageUpdate", async (oldMsg, newMsg) => {

  if (oldMsg.author.bot) return;

  // if (!logA[oldMsg.guild.id]) return;

  var user = oldMsg.author;

  //var kanal = oldMsg.guild.channels.get(logA[oldMsg.guild.id].log);

  if (db.has(`log_${oldMsg.guild.id}`) === false) return;

  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`))
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
    .addField("Kullanıcı Tag", oldMsg.author.tag, true)
    .addField("ID", oldMsg.author.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(oldMsg.author.avatarURL)
  kanal.send(embed);

});

client.on("roleCreate", role => {

  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`))
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal.send(embed);

});

client.on("roleDelete", role => {

  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`))
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal.send(embed);

});

client.on("roleUpdate", role => {

  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`))
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal.send(embed);

});

client.on('voiceStateUpdate', (oldMember, newMember) => {

  // if (!logA[oldMember.guild.id]) return;

  if (db.has(`log_${oldMember.guild.id}`) === false) return;

  var kanal = oldMember.guild.channels.get(db.fetch(`log_${oldMember.guild.id}`))
  if (!kanal) return;

  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if (oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);

  } else if (newUserChannel === undefined) {

    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`${newMember.user.tag} adlı kullanıcı bir sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);


  }
});

client.on("guildMemberAdd", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
      .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
        .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye • ${
            member.guild.members.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});
//Yashinu (Akame Owner)
client.on("guildMemberRemove", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
      .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
        .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye • ${
            member.guild.members.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});


// PROFİL SİSTEMİ BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO BAŞLAR BU ARADA --------------------------------------------



client.on("message", async message => {
  var onay = client.emojis.get(client.emojiler.evet);
  var red = client.emojis.get(client.emojiler.hayır);
  const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
  if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;



  let i = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  let prefix;
  if (i) {
    prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] + " " : i;
  } else {
    prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] + " " : `${message.guild.commandPrefix}`;
  }

  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();









  if (command === 'profil' || command === 'profile') {
    message.channel.startTyping()
    var xp = db.fetch(`puancik_${user.id + message.guild.id}`);
    var lvl = db.fetch(`seviye_${user.id + message.guild.id}`);
    var user = message.mentions.users.first() || message.author;
    let memberID = await db.fetch(`memberID_${user.id}`);
    if (memberID == null) memberID = 'Biyografi mesaji ayarlanmamis.'
    let membername = await db.fetch(`membername_${user.id}`);
    if (membername == null) membername = `${user.tag}`
    let memberBadge = await db.fetch(`memberBadge_${user.id}`);




    if (memberBadge == null) memberBadge = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
    let memberBadge2 = await db.fetch(`memberBadge2_${user.id}`);
    if (memberBadge2 == null) memberBadge2 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
    let memberBadge3 = await db.fetch(`memberBadge3_${user.id}`);
    if (memberBadge3 == null) memberBadge3 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
    let memberBadge4 = await db.fetch(`memberBadge4_${user.id}`);
    if (memberBadge4 == null) memberBadge4 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
    let memberBadge5 = await db.fetch(`memberBadge5_${user.id}`);
    if (memberBadge5 == null) memberBadge5 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
    let memberBadge6 = await db.fetch(`memberBadge6_${user.id}`);
    if (memberBadge6 == null) memberBadge6 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
    // https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png

    const bg = await Jimp.read("https://cdn.discordapp.com/attachments/521363740755623986/528277129989849130/unknown.png");
    const userimg = await Jimp.read(user.avatarURL);
    const onay = await Jimp.read(`${memberBadge}`);
    const ekip = await Jimp.read(`${memberBadge2}`);
    const destek = await Jimp.read(`${memberBadge3}`);
    const mod = await Jimp.read(`${memberBadge4}`);
    const partner = await Jimp.read(`${memberBadge5}`);
    const paraR = await Jimp.read(`${memberBadge6}`);
    var font;
    if (membername.length < 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (membername.length > 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    var font2;
    if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    var font3;
    if (user.tag.length < 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (user.tag.length > 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    else font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    var font4;
    if (user.tag.length < 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (user.tag.length > 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    await bg.print(font, 365, 45, `${membername}`);
    await bg.print(font2, 40, 300, `Xp: ${xp || 0}`);
    await bg.print(font2, 40, 340, `Seviye: ${lvl || 0}`);
    await bg.print(font3, 40, 380, `Biyografi: ${memberID}`);
    await userimg.resize(210, 220);
    await (!userimg.resize(214, 220));
    await onay.resize(32, 32);
    await ekip.resize(32, 32);
    await destek.resize(32, 32);
    await mod.resize(32, 32);
    await partner.resize(32, 32);
    await paraR.resize(32, 32);
    await bg.composite(paraR, 370, 100).write("./img/paraR/" + client.user.id + "-" + user.id + ".png");
    await bg.composite(onay, 410, 100).write("./img/onay/" + client.user.id + "-" + user.id + ".png");
    await bg.composite(ekip, 490, 100).write("./img/ekip/" + client.user.id + "-" + user.id + ".png");
    await bg.composite(destek, 450, 100).write("./img/destek/" + client.user.id + "-" + user.id + ".png");
    await bg.composite(mod, 530, 100).write("./img/mod/" + client.user.id + "-" + user.id + ".png");
    await bg.composite(partner, 500, 100).write("./img/mod/" + client.user.id + "-" + user.id + ".png");
    await bg.composite(userimg, 143, 27.8).write("./img/userimg/" + client.user.id + "-" + user.id + ".png");

    setTimeout(function() {
      message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının profil kartı**`)
      message.channel.send(new Discord.Attachment("./img/userimg/" + client.user.id + "-" + user.id + ".png"));
    }, 1000);
    setTimeout(function() {
      fs.unlink("./img/userimg/" + client.user.id + "-" + user.id + ".png");
    }, 10000);
    message.channel.stopTyping()
  }

  /*
    if (command === 'rütbe' || command === 'rank') {
      message.channel.startTyping()
        var user = message.mentions.users.first() || message.author;
        let membername = await db.fetch(`membername_${user.id}`);
        if (membername == null) membername = `${user.tag}`
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/482242581040988160/fadawdawdawd.png");
				const userimg = await Jimp.read(user.avatarURL);
				var font;
				if (user.tag.length < 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				await bg.print(font2, 100, 75, `GP: ${userData.points}`);
				await bg.print(font2, 100, 55, `Level: ${userData.level}`);
				await bg.print(font, 103, 10, membername);
				await userimg.resize(90, 90);
				await (!userimg.resize(90, 90));
        await bg.composite(userimg, 5, 5).write("./img/rank/" + client.user.id + "-" + user.id + ".png");
				  setTimeout(function () {
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının rütbe kartı**`)
						message.channel.send(new Discord.Attachment("./img/rank/" + client.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/rank/" + client.user.id + "-" + user.id + ".png");
				  }, 10000);
      message.channel.stopTyping()
    }
    */

  if (command === "bioayarla" || command === "biyografi" || command === "biyografi-ayarla" || command === "hakkında") {

    var biyo = args.slice(0).join(' ');
    if (biyo.length < 1) return message.reply('Lütfen biyografinizi yazınız!')

    if (args.join(' ').length > 35) return message.channel.send(`${red} En fazla 35 karakter girebilirsiniz.`)

    if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
      return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: ${prefix}biyografi Leınx'S bot adamdır.`)
    let newMessage;
    if (args.join(" ").toLowerCase() === `none`) newMessage = '';
    else newMessage = args.join(" ").trim();
    const i = await db.set(`memberID_${message.author.id}`, newMessage)
    return message.channel.send(`${onay} Yeni biyografin ayarlandı.`)
  }


  if (command === "isim" || command === "isimayarla") {
    if (args.join(' ').length > 15) return message.channel.send(`${red} En fazla 15 karakter girebilirsiniz.`)

    var isim = args.slice(0).join(' ');
    if (isim.length < 1) return message.reply('Lütfen bir isim giriniz!')


    let newMessage;




    if (args.join(" ").toLowerCase() === `none`) newMessage = '';
    else newMessage = args.join(" ").trim();
    const i = await db.set(`membername_${message.author.id}`, newMessage)
    return message.channel.send(`${onay} Yeni ismin ayarlandı.`)
  }


  if (command === "rozet-parar") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channek.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge6_${user.id}`, "https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png")
    return message.channel.send(`${onay} Verdım aşkm.`)

  }

  if (command === "rozet-onayla") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channek.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435015/401725450470031362.png")
    return message.channel.send(`${onay} Kullanıcıya onay rozeti verilmiştir.`)

  }

  if (command === "rozet-konay" || command === "rozet-konayla") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channel.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png")
    return message.channel.send(`${onay} Kullanıcıdan onay rozeti alınmıştır.`)

  }

  if (command === "rozet-yetkili" || command === "rozet-ekip") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channel.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge2_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435009/401723658491527168.png")
    return message.channel.send(`${onay} Kullanıcıya ekip rozeti verilmiştir.`)

  }

  if (command === "rozet-kyetkili" || command === "rozet-kekip") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channel.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge2_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png")
    return message.channel.send(`${onay} Kullanıcıdan ekip rozeti alınmıştır.`)

  }

  if (command === "rozet-destekci" || command === "rozet-destekçi") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channel.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge3_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845737006202881/401725034453925889.png")
    return message.channel.send(`${onay} Kullanıcıya destekçi rozeti verilmiştir.`)

  }

  if (command === "rozet-kdestekci" || command === "rozet-kdestekçi") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channel.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge3_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png")
    return message.channel.send(`${onay} Kullanıcıdan destekçi rozeti alınmıştır.`)

  }

  if (command === "rozet-mod" || command === "rozet-moderator") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channel.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge4_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845735647117312/401724520806875139.png")
    return message.channel.send(`${onay} Kullanıcıya moderator rozeti verilmiştir.`)

  }

  if (command === "rozet-kmod" || command === "rozet-kmoderator") {
    if (message.author.id !== "507803933557915652" && message.author.id !== "336869318874890241") return message.channel.send(`${red} Bu komutu kullanmak için yetkin bulunmuyor.`);
    const i = await db.set(`memberBadge4_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png")
    return message.channel.send(`${onay} Kullanıcıdan moderator rozeti alınmıştır.`)

  }
})

// PROFİL SİSTEMİ BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO BİTER BU ARADA ---------------------------------------------

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.english = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  //log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    //log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.english.set(props.help.enname, props)
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};




client.on("message", async msg => {

  const request = require('node-superfetch');
  const db = require('quick.db');





  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if (msg.content.length > 7) {

    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1)
  };

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 250) {

    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)

    msg.channel.send(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}** seviye oldun!`)

    db.delete(`puancik_${msg.author.id + msg.guild.id}`)

  };
});


/*
const DBL = require("dblapi.js");
const dbl = new DBL(client.ayarlar.dbltoken, client);


client.on('ready', () => {
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 1800);
});

dbl.getStats("516600125649453066").then(stats => {
  console.log('DBL ye gerekli verileri girdim.') // {"server_count":2,"shards":[]}
});
*/
// PRİV HUB

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  let geciciOda = "701804923767095297"; // GEÇİÇİ ODA OLACAK ODANIN IDSI
  let geciciOdaSembol = "*" // GEÇİCİ ODANIN BAŞINA EKLENECEK SEMBOL
  
  if (!newMember.user.bot && newMember.guild.channels.has(geciciOda) && newMember.voiceChannel && newMember.voiceChannel.id === geciciOda) {
    try {
      newMember.guild.createChannel(geciciOdaSembol + " " + (newMember.displayName).replace(/[^a-zA-ZığüşöçĞÜŞİÖÇ0123456789 ]+/g, ''), { type: "voice", parent: newMember.guild.channels.get(geciciOda).parentID }).then(async kanal => {
        await kanal.overwritePermissions(newMember.id, { VIEW_CHANNEL: true, CONNECT: true, SPEAK: true, MUTE_MEMBERS: true, MOVE_MEMBERS: true, DEAFEN_MEMBERS: true, MANAGE_CHANNELS: false, MANAGE_ROLES: false, MANAGE_WEBHOOKS: false });
        await newMember.setVoiceChannel(kanal.id);
      });
    } catch (yashinu) { console.error(yashinu) };
  };
  
  if (oldMember.voiceChannel && (oldMember.voiceChannel.name).includes(geciciOdaSembol) && oldMember.voiceChannel.members.filter(uye => !uye.user.bot).size < 1) await oldMember.guild.channels.filter(kanal => kanal.type === "voice" && kanal.members.filter(uye => !uye.user.bot).size < 1 && (kanal.name).includes(geciciOdaSembol)).forEach(kanal => kanal.delete());
});

// PRİV HUB


client.login('NzYzNTM2ODQ3MzA5NjM1NjE1.X35JGg.g-xbisCfc48yhSQldtUOqt4LcNI')