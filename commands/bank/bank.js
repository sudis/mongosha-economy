const { MessageEmbed, Client, Message, MessageAttachment } = require("discord.js");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const settings = require("../../settings.json");
const moment = require("moment")
const code = require("@codedipper/random-code")

moment.locale("TR")
const emojis = require("../../emojis.json")

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {


  let acceptmoji = client.emojis.cache.get(emojis.acceptordeny.yesemoji)
  let denymoji = client.emojis.cache.get(emojis.acceptordeny.noemoji)
  let money = client.emojis.cache.get(emojis.other.money)
  let document = client.emojis.cache.get(emojis.other.document)
  let wallet = client.emojis.cache.get(emojis.other.wallet)
  let glass = client.emojis.cache.get(emojis.other.glass)

if (args[0] === "oluştur") {

let check = await db.get(`bank.account.${message.author.id}`)
if (check) {
  message.react(denymoji)
  message.channel.send(`Hurra! Zaten bir __banka hesabın__ var **${message.author.username}**! Mevcut bankanı **görmek** için \`bankam\` komutunu kullan.`).then(x => x.delete({timeout: 7000}))
  return
}
let kod = code(6, ["0","1","2","3","4","5","6"])
await db.set(`bank.infos.${kod}`, {
  Name: message.author.id,
  CardName: "Kişisel",
  Found: Date.now()
})

await db.set(`bank.account.${message.author.id}`, kod)
await db.add(`bank.${kod}.funds`, +500)
message.channel.send(`Hehe! __Banka hesabını__ oluşturdum **${message.author.username}**! Artık bankana **\`${kod}\`** ile erişebilirsin. Yaklaşık **500 SC** de hesabına ekledim.`).then(x => x.delete({timeout: 7000}))
message.react(acceptmoji)
  return
}



if (!args[0]) {
  let membercode = await db.get(`bank.account.${message.author.id}`)
  let infoa = await db.get(`bank.infos.${membercode}`)
  let bal = await db.get(`bank.${membercode}.funds`)
  if (!infoa) {
    message.channel.send(`Hurra! Bir __banka hesabı kodu__ girmelisin **${message.author.username}**! Eğer bir banka hesabı **oluşturmak** istersen **\`banka oluştur\`** komutunu kullanman yeterli.`).then(x => x.delete({timeout: 7000}))
    message.react(denymoji)
    return
  }
  message.channel.send(`${document} **Hesap Sahibi:** <@${infoa.Name}> \n${wallet} **Hesabın Türü:** ${infoa.CardName} \n${money} **Hesabın Bakiyesi:** \`${bal}\` \n${glass} **Hesap Numarası:** \`${membercode}\` \n:stopwatch: **Açılış Tarihi:** ${moment(infoa.Found).format("DD MMMM YYYY (HH:mm:ss)")}`).then(x => x.delete({timeout: 17000}))
message.react(acceptmoji)
return
}

let arg = message.mentions.members.first() 
if (arg) {
let membercode = await db.get(`bank.account.${arg.id}`)
let fetch = await db.get(`bank.${membercode}`)
let info = await db.get(`bank.infos.${membercode}`)
if (!info || !fetch) return message.channel.send(`Tüh ya! Girdiğin kişinin banka hesabını bulamadım **${message.author.username}**! Bir banka hesabı **oluşturmadıysan** lütfen **\`banka oluştur\`** komutunu kullanman yeterli.`).then(x => x.delete({timeout: 7000}))
message.react(acceptmoji)
message.channel.send(`${document} **Hesap Sahibi:** <@${info.Name}> \n${wallet} **Hesabın Türü:** ${info.CardName} \n${money} **Hesabın Bakiyesi:** \`${fetch.funds}\` \n${glass} **Hesap Numarası:** \`${membercode}\` \n:stopwatch: **Açılış Tarihi:** ${moment(info.Found).format("DD MMMM YYYY (HH:mm:ss)")}`).then(x => x.delete({timeout: 17000}))
return
}

if (!arg) {
  let fetchiki = await db.get(`bank.${args[0]}`)
  if (!fetchiki) {
    message.channel.send(`Tüh ya! Girdiğin \`${args[0]}\` banka hesabı numarasıyla ilgili bir hesap bulunamadı **${message.author.username}**! Bir banka hesabı **oluşturmadıysan** lütfen **\`banka oluştur\`** komutunu kullanman yeterli.`).then(x => x.delete({timeout: 7000}))
    message.react(denymoji)
    return
  }

  let info = await db.get(`bank.infos.${args[0]}`)
  let fetch = await db.get(`bank.${args[0]}`)
message.react(acceptmoji)
message.channel.send(`${document} **Hesap Sahibi:** <@${info.Name}> \n${wallet} **Hesabın Türü:** ${info.CardName} \n${money} **Hesabın Bakiyesi:** \`${fetch.funds}\` \n${glass} **Hesap Numarası:** \`${args[0]}\` \n:stopwatch: **Açılış Tarihi:** ${moment(info.Found).format("DD MMMM YYYY (HH:mm:ss)")}`).then(x => x.delete({timeout: 17000}))


return
}


  return
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["banka"]
};

module.exports.help = {
  name: 'banka',
  help: 'Banka oluşturmak, bakiyeyi görüntülemek ve dahası.',
  usage: 'banka [oluştur/@üye/<kod>]',
  category: 'Bank'
};
