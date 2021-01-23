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
  let balance = await db.get(`bank.${membercode}.funds`)
  if (balance < 500) return message.channel.send(`Bu oyuna başlamak için en az \`500\` **SC**'ye sahip olmalısın.`) 
  if (!(args[0])) return message.channel.send(`Bu oyunu başlatmak için bir seçim yap, \`yazı\` mı \`tura\` mı?`)
  if (!isNaN(args[0])) return message.channel.send(`Bu oyunu başlatmak için bir seçim yap, \`yazı\` mı \`tura\` mı?`)
  if (isNaN(args[1])) return message.channel.send(`Ortaya bir bahis koy!`)
  if (args[1] > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` **SC** mevcut. Senin girdiğin tutar ${args[1]}!`)
  let chances = ["yazı","tura"].random()

  if (chances === "yazı") {
    if (args[0] === "yazı") {
      message.channel.send(`**${message.author.username}** \`yazı\` için **${args[1]} SC** bahsini koydu. Para dönüyor ve sonuç...`).then(x => { 
        setTimeout(function(){
        x.edit(`<:coins:799658612175142972> Havalar paraya atılır ve sonuç: \`yazı\`! Toplam **${args[1] * 2}** **SC** kazandın.`)
        },2500)
        }
        );
      await db.add(`bank.${membercode}.funds`, +args[1] * 2).catch(err => console.log(err))
      return

    } else {
      message.channel.send(`**${message.author.username}** \`tura\` için **${args[1]} SC** bahsini koydu. Para dönüyor ve sonuç...`).then(x => { 
        setTimeout(function(){
        x.edit(`<:coin2:799660349984997436> Havalar paraya atılır ve sonuç: \`yazı\`! Toplam **${args[1]} SC** kaybettin.`)
        },2500)
        }
        );
      await db.add(`bank.${membercode}.funds`, -args[1]).catch(err => console.log(err)) 
      return
    }
  } 

  if (chances === "tura") {
    if (args[0] === "tura") { 
      message.channel.send(`**${message.author.username}** \`tura\` için **${args[1]} SC** bahsini koydu. Para dönüyor ve sonuç...`).then(x => { 
        setTimeout(function(){
        x.edit(`<:coin2:799660349984997436> Havalar paraya atılır ve sonuç: \`tura\`! Toplam **${args[1] * 2}** **SC** kazandın.`)
        },2500)
        }
        );
      await db.add(`bank.${membercode}.funds`, +args[1] * 2).catch(err => console.log(err))
      return

    } else {
      message.channel.send(`**${message.author.username}** \`yazı\` için **${args[1]} SC** bahsini koydu. Para dönüyor ve sonuç...`).then(x => { 
        setTimeout(function(){
        x.edit(`<:coins:799658612175142972> Havalar paraya atılır ve sonuç: \`tura\`! Toplam **${args[1]} SC** kaybettin.`)
        },2500)
        }
        );
      await db.add(`bank.${membercode}.funds`, -args[1]).catch(err => console.log(err))
      return
    }
  } 

  }
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yazı-tura","coinflip","cf"]
};

module.exports.help = {
  name: 'yazı-tura',
  help: 'Yazı tura oynayarak kaderinize şekil verin.',
  usage: 'cf [yazı/tura] [<bahis>]',
  category: 'Games'
};
