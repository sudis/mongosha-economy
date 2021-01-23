const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")


/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

  let bank = await db.get(`bank`) || {}

  
  let data = Object.keys(bank).filter(x => !isNaN(x) && x.length === 6)
  let dataTop = data.filter(x => data).sort((a, b) => Number((bank[b].funds || 0)) - Number((bank[a].funds))).map((value, index) => `\`${index + 1}.\` **${value}** | \`${(bank[value].funds || 0)}\``).splice(0, 20).join("\n");

  let kayra = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle(`En Fazla Paraya Sahip Olanlar`)
    .setDescription(dataTop || "Herhangi bir para verisi bulamadım.")
    .setColor("BLUE")
    .setTimestamp()

  await message.channel.send(kayra)
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["top"]
};

module.exports.help = {
  name: 'zenginler',
  help: 'En fazla paraya sahip olan 20 kişiyi gösterir',
  usage: 'zenginler',
  category: 'Bank'
};
