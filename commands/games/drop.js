const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const ms = require("parse-ms")
const emojis = require("../../emojis.json")

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

  let check = await db.get(`bank.account.${message.author.id}`)
  if (!check) {
    message.channel.send(`Tüh ya! Bu eylemi gerçekleştirmek için bir banka hesabına sahip olmalısın **${message.author.username}**!`)
    return
  }

  let acceptmoji = client.emojis.cache.get(emojis.acceptordeny.yesemoji)
  let denymoji = client.emojis.cache.get(emojis.acceptordeny.noemoji)
  let dropped = client.emojis.cache.get(emojis.other.dropped)

  let timeout = 10000
  let bump = await db.get(`cooldowns.drop.${message.author.id}`)
  if (bump !== null && timeout - (Date.now() - bump) > 0) {
    let time = ms(timeout - (Date.now() - bump))
  message.channel.send(`Hurra! Yerden __bu kadar hızlı__ para toplayamazsın **${message.author.username}**!. Lütfen ${time.hours} saat, ${time.minutes} dakika, ${time.seconds} saniye bekle.`)
  message.react(denymoji)
  return  
}

 if (!args[0]) {
    message.channel.send(`Hurra! Bir para miktarı girmelisin **${message.author.username}**!`)
    message.react(denymoji)
    return
  }
 let membercode = await db.get(`bank.account.${message.author.id}`)
 let balance = await db.get(`bank.${membercode}.funds`)
 if (args[0] > balance) {
   message.channel.send(`Höh! Bankanda şu an **\`${balance}\` SC** bulunuyor **${message.author.username}**! Senin girdiğin tutar ise **${args[0]}**.`).then(x => x.delete({timeout: 5000}))
   message.react(denymoji)
   return
 } 

 let totalmoney = await db.get(`bank.games.drop.funds.${message.channel.id}`) || 0

 if (totalmoney > args[0]) {
  await db.add(`bank.${membercode}.funds`, +args[0])
  await db.add(`bank.games.drop.funds.${message.channel.id}`, -args[0])
  message.channel.send(`${dropped} Hurra! Şanslı günündesin **${message.author.username}**! Yerden toplamda **\`${args[0]}\` SC** ele geçirdin.`).then(x => x.delete({timeout: 5000}))
  message.react(acceptmoji)
  await db.set(`cooldowns.drop.${message.author.id}`, Date.now())
  return
}

 if (totalmoney < args[0]) {
  await db.add(`bank.${membercode}.funds`, -args[0])
  await db.add(`bank.games.drop.funds.${message.channel.id}`, +args[0])
  message.channel.send(`${dropped} Tüh ya! Hiç şanslı değilsin **${message.author.username}**! Yere toplamda **\`${args[0]}\' SC** düşürdün.`).then(x => x.delete({timeout: 2000}))
  message.react(acceptmoji)
  await db.set(`cooldowns.drop.${message.author.id}`, Date.now())
  return
 }
 
 if (totalmoney == args[0]) {
  await db.add(`bank.${membercode}.funds`, +args[0])
  await db.add(`bank.games.drop.funds.${message.channel.id}`, -args[0])
  message.channel.send(`${dropped} Hurra! Şanslı günündesin **${message.author.username}**!! Yerden toplamda **\`${args[0]}\` SC** ele geçirdin.`).then(x => x.delete({timeout: 5000}))
  message.react(acceptmoji)
  await db.set(`cooldowns.drop.${message.author.id}`, Date.now())
  return
 }

}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["drop","düşür"]
};

module.exports.help = {
  name: 'düşür',
  help: 'Düşürme oyununda toplamak için girdiğiniz bakiye eğer yerde yoksa siz düşürürsünüz.',
  usage: 'düşür [<bahis>]',
  category: 'Games'
};
