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

  let denymoji = client.emojis.cache.get(emojis.acceptordeny.noemoji)
  let dropped = client.emojis.cache.get(emojis.other.dropped)

  if (args[0] === "topla") {
    await db.set(`bank.games.handsup.debug.${message.author.id}`, true)
    let checkdebug = await db.has(`bank.games.handsup.debug.${message.author.id}`)
    if (checkdebug) {
    let membercode = await db.get(`bank.account.${message.author.id}`)
    let check = await db.get(`bank.games.handsup.playing.${message.channel.id}`)
    if (check == 1) return message.channel.send(`${denymoji} Yerdeki parayı toplayabilmek için en az bir kişi daha yere para atmalı **${message.author.username}**.`)
    if (check == 0) return message.channel.send(`${denymoji} Yerde hiç para yok **${message.author.username}**. Yere bir para atmalısın.`) 
    await db.delete(`bank.games.handsup.debug.${message.author.id}`)
    let money = await db.get(`bank.games.handsup.funds.${message.channel.id}`)
    if (money === undefined) return message.channel.send(`Oyuna katılmış kimse yok!`)
    await db.add(`bank.${membercode}.funds`, +money).catch(err => console.log(err))
    message.channel.send(`${dropped} Hurra! Yerden \`${money}\` **SC** tutarında para topladın ${message.author.username}.`)
  
    await db.delete(`bank.games.handsup.playing.${message.channel.id}`)
    await db.delete(`bank.games.handsup.funds.${message.channel.id}`)
    return

    } else {
      message.channel.send(`Dur bakalım başka bir kişinin toplama isteği sürüyor!`)
    }
  }

  let embed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setTitle("Eller Havaya Oyunu")
  .setDescription("Eller Havaya oyununun mantığı çok basittir. Çantaya bir para bırakırsınız ve ikinci bir kişi para bırakmadan tekrar parayı toplayamazsın. Unutma sadece bu kanalda oynanan paraları toplayabilirsin. (Eğer tekrar ortaya para koyarsan bu sefer ortadaki parayı toplayabilirsin.)")
  .setColor("BLUE")

  if (!args[0]) return message.channel.send(embed)

  let membercode = await db.get(`bank.account.${message.author.id}`)
  let balance = await db.get(`bank.${membercode}.funds`) 
  if (args[0] > balance) {
    message.channel.send(`Höh! Bankanda şu an **\`${balance}\` SC** bulunuyor **${message.author.username}**! Senin girdiğin tutar ise **${args[0]}**.`).then(x => x.delete({timeout: 5000}))
    message.react(denymoji)
    return
  } 
 
  await db.add(`bank.games.handsup.funds.${message.channel.id}`, +args[0])
  await db.add(`bank.${membercode}.funds`, -args[0])
  await db.add(`bank.games.handsup.playing.${message.channel.id}`, +1) 
  message.channel.send(`${dropped} **${message.author.username}** Ortaya toplam \`${args[0]}\` para bıraktın!`).then(x => x.delete({timeout: 2000}))




}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["handsup","eller-havaya","yakalayan-kazanır"]
};

module.exports.help = {
  name: 'eller-havaya',
  help: 'Eller havaya oyununda yere bir para bırakırsınız fakat ikinci bir kişi para bırakmadan yerdeki para toplanamaz.',
  usage: 'eller-havaya [<bahis>/topla]'
};
