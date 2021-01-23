const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const emojis = require("../../emojis.json")
const ms = require("parse-ms")
const moment = require("moment")


/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

  let banknote = client.emojis.cache.get(emojis.other.money)

  let check = await db.get(`bank.account.${message.author.id}`)
  if (!check) {
    message.channel.send(`Tüh ya! Bu eylemi gerçekleştirmek için bir banka hesabına sahip olmalısın **${message.author.username}**!`)
    return
  }

  let timeout = 1600000
  let bump = await db.get(`cooldowns.work.${message.author.id}`)
  if (bump !== null && timeout - (Date.now() - bump) > 0) {
    let time = ms(timeout - (Date.now() - bump))
    return message.channel.send(`${banknote} Hurra! Yeniden çalışmak için süren bitmedi **${message.author.username}**! Lütfen ${time.hours} saat, ${time.minutes} dakika, ${time.seconds} saniye bekle.`)
  }

  var money = Math.floor(Math.random() * 250)

  await db.add(`bank.${check}.funds`, +money)
  message.channel.send(`${banknote} Hurra! Çalışarak toplamda \`${money}\` kazandın **${message.author.username}**!`)
  await db.set(`cooldowns.work.${message.author.id}`, Date.now())
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çalış","work"]
};

module.exports.help = {
  name: 'çalış',
  help: 'Çalışarak para kazanabilirsiniz.',
  usage: 'çalış',
  category: 'Earnings'
};
