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

  let moneymoji = client.emojis.cache.get(emojis.other.money)

let timeout = 86400000
let bump = await db.get(`cooldowns.daily.${message.author.id}`)
if (bump !== null && timeout - (Date.now() - bump) > 0) {
  let time = ms(timeout - (Date.now() - bump))
  return message.channel.send(`${moneymoji} Hurra! Günlük maaşını toplaman için süren bitmedi **${message.author.username}**! Lütfen ${time.hours} saat, ${time.minutes} dakika, ${time.seconds} saniye bekle.`)
}

let membercode = await db.get(`bank.account.${message.author.id}`)

var money = Math.floor(Math.random() * 1550)

await db.add(`bank.${membercode}.funds`, money)
message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`${moneymoji} **${message.author.username}** günlük maaşın olan **${money} SC**'yi başarıyla topladın.`).setColor("EC6969"))
await db.set(`cooldowns.daily.${message.author.id}`, Date.now())


return
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["günlük"]
};

module.exports.help = {
  name: 'günlük',
  help: 'Her gün yenilenen maaşınızı alabilirsiniz.',
  usage: 'günlük',
  category: 'Bank'
};
