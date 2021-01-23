const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const emojis = require("../../emojis.json")






/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

  let lemon = client.emojis.cache.get(emojis.slots.lemon)
  let garnet = client.emojis.cache.get(emojis.slots.garnet)
  let avocado = client.emojis.cache.get(emojis.slots.avocado)
  let coconut = client.emojis.cache.get(emojis.slots.coconut)
  let unread = client.emojis.cache.get(emojis.slots.unread)

  let slot = [lemon, garnet, avocado, coconut];

  let check = await db.get(`bank.account.${message.author.id}`)
  if (!check) {
    message.channel.send(`Tüh ya! Bu eylemi gerçekleştirmek için bir banka hesabına sahip olmalısın **${message.author.username}**!`)
    return
  }

  let membercode = await db.get(`bank.account.${message.author.id}`)
  let balance = await db.get(`bank.${membercode}.funds`)
  if (!args[0]) return message.channel.send(`Bir bahis tutarı gir!`)
  if (isNaN(args[0])) return message.channel.send(`Sadece sayı girebilirsin!`)
  if (args[0] > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` **SC** mevcut. Senin girdiğin tutar ${args[0]}!`)

  var slot1 = slot.random()
  var slot2 = slot.random()
  var slot3 = slot.random()
  
  if (slot1 === slot2 && slot1 === slot3) {
    await db.add(`bank.${membercode}.funds`, +args[0] * 3)
message.channel.send(`<:waiter:799747459802464256> **${message.author.username}** slot oyununa **${args[0]} SC** bahis koydu. \n${unread} : ${unread} : ${unread}`).then(x => { 
  setTimeout(function(){
  x.edit(`**${message.author.username}** slot oyununa **${args[0]} SC** bahis koydu. \n${slot1} : ${slot2} : ${slot3} \n\n**${args[0] * 4} SC KAZANDIN!**`)
  },2500)
  }
  )

  } else {
    await db.add(`bank.${membercode}.funds`, -args[0])
    message.channel.send(`<:waiter:799747459802464256> **${message.author.username}** slot oyununa **${args[0]} SC** bahis koydu. \n${unread} : ${unread} : ${unread}`).then(x => { 
      setTimeout(function(){
      x.edit(`**${message.author.username}** slot oyununa **${args[0]} SC** bahis koydu. \n${slot1} : ${slot2} : ${slot3} \n\n**${args[0]} SC KAYBETTİN!**`)
      },2500)
      }
      );

}

};
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slots","slot","s"]
};

module.exports.help = {
  name: 'slots',
  help: 'Slot oyunu basit bir oyundur. Üç meyveyi aynı anda yakalarsanız paranız katlanır.',
  usage: 'slot [<bahis>]',
  category: 'Games'
};


