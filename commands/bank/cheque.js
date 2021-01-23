const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const code = require("@codedipper/random-code")
const emojis = require("../../emojis.json")

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

  let acceptmoji = client.emojis.cache.get(emojis.acceptordeny.yesemoji)
  let denymoji = client.emojis.cache.get(emojis.acceptordeny.noemoji)

  let check = await db.get(`bank.account.${message.author.id}`)
  if (!check) {
    await message.channel.send(`Tüh ya! Bu eylemi gerçekleştirmek için bir banka hesabına sahip olmalısın **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
    message.react(denymoji)
    return
  }
  let membercode = await db.get(`bank.account.${message.author.id}`)
  let balance = await db.get(`bank.${membercode}.funds`)

  if (args[0] === "tahsil") {
    if (!args[1]) {
       await message.channel.send(`Hurra! Tahsil edilecek çekin kodunu girmelisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
    }
    let cheque = await db.get(`cheque.${args[1]}`)
    if (!cheque) {
       await message.channel.send(`Tüh ya! Girdiğin çekin kodu maalesef işe yaramadı **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
    }
    await db.add(`bank.${membercode}.funds`, +cheque)
    await db.delete(`cheque.${args[1]}`)
    await message.channel.send(`Hehe! Tahsilat işlemi başarıyla tamamlandı **${message.author.username}**! Girdiğin çekten toplamda \`${cheque}\` tahsil edildi.`).then(x => x.delete({timeout: 3000}))
    message.react(acceptmoji)
    return
  }

  if (!args[0]) {
     await message.channel.send(`Hurra! Bir çek oluşturmak için o çekin ne kadar para taşıyacağını belirtmeniz lazım **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
     message.react(denymoji)
     return
    }
  if (isNaN(args[0])) {
    await message.channel.send(`Hurra! Bir çek oluşturmak için mutlaka bir sayı girmelisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
     message.react(denymoji)
  }
  if (args[0] > balance) {
     message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` **SC** mevcut. Senin girdiğin tutar ${args[1]}!`)
     message.react(denymoji)
     return
  }
  let kod = code(30, ["X","Z","Y","A","B","C","D","E","F","G","H","I","J","K","Y","M","N","O"])
  await db.add(`bank.${membercode}.funds`, -args[0])
await db.set(`cheque.${kod}`, args[0])
message.author.send(`Başarıyla \`${args[0]}\` değerindeki çekinizi oluşturdum. Bu çeki birisine verebilirsiniz veya tekrar kullanabilirsiniz. \nÇek Kodu: ||\`${kod}\`||`).catch(err => console.log(err))
await message.channel.send(`Hehe! İstediğiniz çeki oluşturup özelden size yolladım **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
message.react(acceptmoji)
return
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çek","cheque"]
};

module.exports.help = {
  name: 'çek',
  help: 'Paranızı 30 haneli bir çeke dönüştürün.',
  usage: 'çek [tahsil/<tutar>]',
  category: 'Bank'
};
