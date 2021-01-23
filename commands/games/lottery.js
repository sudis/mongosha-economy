const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const code = require("@codedipper/random-code")
const kod = code(6, ["0","1","2","3","4","5","6"])
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

  let embed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setTitle("Piyango Sistemi")
  .setDescription(`${this.help.help} \n${this.help.usage}`)
  if (!args[0]) return message.channel.send(embed)

let membercode = await db.get(`bank.account.${message.author.id}`)
let balance = await db.get(`bank.${membercode}.funds`)

  if (args[0] === "çeyrek") {
    if (balance < 10000) return message.channel.send(`Çeyrek Piyango bileti almak için \`10.000 SC\` miktarına sahip olmalısın. (**${message.author.username}**'da olan tutar: **${balance} SC**)`)
    await db.add(`bank.${membercode}.funds`, -10000)
    await db.set(`games.lottery.${kod}`, {
      Owner: message.author.id,
      Type: "Çeyrek",
      Code: kod
    })
    message.channel.send(`**[Çeyrek Piyango Bileti]** \nBilet Kodun: **\`${kod}\`**`)
    await db.add(`lottery.size.${message.guild.id}`, +1)
    return
  }

  if (args[0] === "yarım") {
    if (balance < 20000) return message.channel.send(`Yarım Piyango bileti almak için \`20.000 SC\` miktarına sahip olmalısın. (**${message.author.username}**'da olan tutar: **${balance} SC**)`)
    await db.add(`bank.${membercode}.funds`, -20000)
    await db.set(`games.lottery.${kod}`, {
      Owner: message.author.id,
      Type: "Yarım",
      Code: kod
    })
    message.channel.send(`**[Yarım Piyango Bileti]** \nBilet Kodun: **\`${kod}\`**`)
    await db.add(`lottery.size.${message.guild.id}`, +1)
    return
  }

  if (args[0] === "tam") {
    if (balance < 40000) return message.channel.send(`Tam Piyango bileti almak için \`40.000 SC\` miktarına sahip olmalısın. (**${message.author.username}**'da olan tutar: **${balance} SC**)`)
    await db.add(`bank.${membercode}.funds`, -40000)
    await db.set(`games.lottery.${kod}`, {
      Owner: message.author.id,
      Type: "Tam",
      Code: kod
    })
    message.channel.send(`**[Tam Piyango Bileti]** \nBilet Kodun: **\`${kod}\`**`)
    await db.add(`lottery.size.${message.guild.id}`, +1)
    return
  }

  if (args[0] === "bitir") {
    let bills = await db.get(`games.lottery`)
    if (!bills) return message.channel.send(`Kimse piyango bileti almamış!`)
    let random = Object.values(bills).random()
    let number = await db.get(`lottery.size.${message.guild.id}`)
    console.log(random)
    let para = number * 40000
    let embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setColor("BLUE")
    .setDescription(`Kazanan Numara: **\`${random.Code}\`** (${random.Type})
    Kazanan Kişi: <@${random.Owner}>
    Kazandığı Tutar: ${para.toFixed(3)} (Bilet tam ise tam, yarım ise yarım, çeyrek ise çeyreğini alacak.)
    `)

    message.channel.send(embed)

    let membercode = await db.get(`bank.account.${random.Owner}`)
    if (random.Type == "Tam") {
    await db.add(`bank.${membercode}.funds`, +number * 40000)
    console.log("Tam verildi.")
  }
  if (random.Type == "Yarım") {
    await db.add(`bank.${membercode}.funds`, +number * 40000 / 2)
    console.log("Yarım verildi.")
  }

  if (random.Type == "Çeyrek") {
    await db.add(`bank.${membercode}.funds`, +number * 40000 / 4) 
  console.log("Çeyrek verildi.")
  }

  await db.delete(`games.lottery`)
  await db.delete(`lottery.size`)
 
    return
  }



  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lottery","piyango"]
};

module.exports.help = {
  name: 'piyango',
  help: 'Piyango oyununa katılmak veya sonlandırmak için kullanılır.',
  usage: 'piyango [tam/yarım/çeyrek/bitir]',
  category: 'Games'
};


