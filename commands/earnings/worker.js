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

  let timeout = 8000000
  let bump = await db.get(`cooldowns.worker.${message.author.id}`)
  if (bump !== null && timeout - (Date.now() - bump) > 0) {
    let time = ms(timeout - (Date.now() - bump))
    return message.channel.send(`${banknote} Hurra! İşçi olarak çalışmak için süren bitmedi **${message.author.username}**! Lütfen ${time.hours} saat, ${time.minutes} dakika, ${time.seconds} saniye bekle.`)
  }

  var money = Math.floor(Math.random() * 10000)

  await db.add(`bank.${check}.funds`, +money)
  message.channel.send(`${banknote} Hurra! Bir binada hammallık toplamda \`${money}\` kazandın **${message.author.username}**!`)
  await db.set(`cooldowns.worker.${message.author.id}`, Date.now())
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["işçi-çalış"]
};

module.exports.help = {
  name: 'işçi-çalış',
  help: 'Daha fazla çalışarak daha fazla para kazan.',
  usage: 'işçi-çalış',
  category: 'Earnings'
};
