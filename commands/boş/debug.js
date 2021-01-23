const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const emojis = require("../../emojis.json")
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")

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

  let membercode = await db.get(`bank.account.${message.author.id}`)


if (args[0] === "ekle") {
  if (!args[1]) return message.channel.send(`Eklenecek parayı gir.`)
  await db.add(`bank.${membercode}.funds`, +args[1])
  let balance = await db.get(`bank.${membercode}.funds`)
  message.channel.send(`${message.author.tag} üyesinin yeni parası: ${balance}`)
  return
}

if (args[0] === "al") {
  if (!args[1]) return message.channel.send(`Alınacak parayı gir.`)
  await db.add(`bank.${membercode}.funds`, -args[1])
  let balance = await db.get(`bank.${membercode}.funds`)
  message.channel.send(`${message.author.tag} üyesinin yeni parası: ${balance}`)
  return
}

message.channel.send(`ekle veya al argümanını kullan.`)

}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["debug"]
};

module.exports.help = {
  name: 'debug'
};
