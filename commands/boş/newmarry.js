const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const code = require("@codedipper/random-code")
const kod = code(6, ["0","1","2","3","4","5","6"])
const moment = require("moment")

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

  let acceptmoji = client.emojis.cache.get(emojis.acceptordeny.yesemoji)
  let denymoji = client.emojis.cache.get(emojis.acceptordeny.noemoji)

  if (args[0] === "kabul") {
    let evlimi = await db.get(`marriages.info.${message.author.id}`)
if (evlimi) {
   message.channel.send(`Hurra! Sen zaten evlisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
   message.react(denymoji)
   return
  }

    if (!args[1]) {
       message.channel.send(`Tüh! Evlilik işlemleri için bir kod girmelisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
      }
    let marriage = await db.get(`marry.waiting.${args[1]}`)
    if (!marriage) {
       message.channel.send(`Girdiğin \`${args[1]}\` koduyla ilgili devam eden bir evlilik işlemi yok **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
      }
    if (marriage.Sender == message.author.id) {
       message.channel.send(`Yuh! Kendi evliliğini nasıl sadece kendin kabul edeceksin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
      }
    console.log(marriage.Sender)
    console.log(marriage.Responder)
    if (marriage.Responder !== message.author.id) {
       message.channel.send(`Tüh ya! Girdiğin \`${args[1]}\` evliliği ile yapabileceğin herhangi bir kabul yetkin yok **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
      }
  
    await db.set(`marriages.info.${message.author.id}`, {
    Wife: marriage.Sender,
    Me: message.author.id,
    Ring: marriage.Ring,
    Code: marriage.Code,
    Time: Date.now()
  })
  
   await db.set(`marriages.info.${marriage.Sender}`, {
     Wife: message.author.id,
     Me: marriage.Sender,
     Ring: marriage.Ring,
     Code: marriage.Code,
     Time: Date.now()
   })
  
   await db.delete(`marry.waiting.${marriage.Code}`)
  await message.channel.send(`<@${message.author.id}> :heart: <@${marriage.Sender}>`, new MessageEmbed().setDescription(`Ben de Discordun bana verdiği yetkiye dayanarak sizi karı ve koca ilan ediyorum.`).setColor("EC6969")).then(x => x.delete({timeout: 10000}))
  message.react(acceptmoji)
   return
  }
  
  if (args[0] === "red") {
    let evlimi = await db.get(`marriages.info.${message.author.id}`)
if (evlimi) {
   await message.channel.send(`Hurra! Sen zaten evlisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
   message.react(denymoji)
   return
  }
    if (!args[1]) { 
      await message.channel.send(`Tüh! Evlilik işlemleri için bir kod girmelisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
      message.react(denymoji)
      return
     }
    let marriage = await db.get(`marry.waiting.${args[1]}`)
    if (!marriage) {
       await message.channel.send(`Girdiğin \`${args[1]}\` koduyla ilgili devam eden bir evlilik işlemi yok **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
      }
    if (marriage.Sender == message.author.id) {
       message.channel.send(`Yuh! Kendi evliliğini az önce kabul ettin, şimdi nasıl reddedeceksin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
      }
    if (marriage.Responder !== message.author.id) {
       await message.channel.send(`Tüh ya! Girdiğin \`${args[1]}\` evliliği ile yapabileceğin herhangi bir kabul yetkin yok **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
       message.react(denymoji)
       return
      }
  
    await db.delete(`marry.waiting.${args[1]}`)
    await message.channel.send(`Doğru karar! Zaten o çocuğu hiç gözüm tutmamıştı **${message.author.username}**!`).then(x => x.delete({timeout: 5000}))
    message.react(acceptmoji)
    return
  }

  if (args[0] === "boşan") {
    let evlimi = await db.get(`marriages.info.${message.author.id}`)
if (!evlimi) {
   await message.channel.send(`Hurra! Sen zaten evli değilsin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
   message.react(denymoji)
   return
  }
await db.delete(`marriages.info.${message.author.id}`)
await db.delete(`marriages.info.${evlimi.Wife}`)
await message.channel.send(`Yazık oldu! Artık hiçbir evliliğin yok **${message.author.username}**!`).then(x => x.delete({timeout: 5000}))
message.react(acceptmoji)
return
  }

  if (args[0] === "bilgi") {
    let member = message.mentions.members.first() || message.member
    let bilgi = await db.get(`marriages.info.${member.id}`)
    if (!bilgi) {
      await message.channel.send(`Tüh ya! Sorgulamaya çalıştığın kişinin bir evliliği yok **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
      message.react(denymoji)
      return
     }

    let variations = ["Çok tatlı değiller mi bence öyleler \`ฅ(＾・ω・＾ฅ)\`", "Ne kadar da mutlular çok kıskandım \`（＾・ω・＾✿）\`", "En iyi çiftlerden birisi ama sık kavga ediyorlar \`(=^･ω･^=)\`", "Ne kadar iyi bir çift değil mi hehe \`[^._.^]ﾉ彡\`", "Mutlulukları daim olsun sonsuza kadar sürsün \`(＾º◡º＾❁)\`"]
 
    let rings;
    if (bilgi.Ring == "AAAA") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322300695805972/lv1.png"
    if (bilgi.Ring == "AAAB") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322299047051274/lv2.png"
    if (bilgi.Ring == "AAAC") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322297164464158/lv3.png"
    if (bilgi.Ring == "AAAD") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322295893590066/lv4.png"
    if (bilgi.Ring == "AAAE") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322294408806420/lv5.png"
    if (bilgi.Ring == "AAAF") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322292918779934/lv6.png"
    if (bilgi.Ring == "AAAG") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322291602292756/lv7.png"
    if (bilgi.Ring == "AAAH") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322290252382228/lv8.png"
    if (bilgi.Ring == "AAAI") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322288662085692/lv9.png"
    if (bilgi.Ring == "AABA") rings = "https://cdn.discordapp.com/attachments/793101318624903178/800322287365914634/lv10.png"


    let bilgin = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription(`${message.author} :heart: <@${bilgi.Wife}> çifti \`${moment(bilgi.Tİme).format("DD MMMM YYYY (HH:mm:ss)")}\` tarihinden beri evli! Parıl parıl parlayan bir ilişkileri olduğuna eminim. ${variations.random()}`)
    .setThumbnail(rings)
    .setColor("BLUE")

    await message.channel.send(bilgin).then(x => x.delete({timeout: 15000}))
message.react(acceptmoji)
    return
  }


let member = message.mentions.members.first()
if (!member) {
   await message.channel.send(`Hurra! Evlenmek için bir kişiyi etiketlemelisin değil mi romeo **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
   message.react(denymoji)
   return
}
if (member.user.bot) {
  await message.channel.send(`Daha neler! Evlenmek için bir botu seçmen oldukça yanlış **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
  message.react(denymoji)
  return
 }
if (member.id == message.author.id) {
  await message.channel.send(`Yuh! Evlenmek için kendinden başka birisini seçmelisin azizim **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
  message.react(denymoji)
  return
 }
let evlimi = await db.get(`marriages.info.${message.author.id}`)
if (evlimi) {
  await message.channel.send(`Hurra! Sen zaten evlisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
   message.react(denymoji)
   return
  }
let ring = await db.get(`bank.properties.${message.author.id}.rings`)
if (!ring) {
  await message.channel.send(`Heyt! Evlenmek için bir yüzüğe ihtiyacın var **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
  message.react(denymoji)
  return
 }
if (!args[1]) {
  await message.channel.send(`Hurra! Evlenmek için bir yüzük kodu girmelisin **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
  message.react(denymoji)
  return
 }
let ringchecke = await db.get(`bank.properties.${message.author.id}.rings`)
let ringcheck = Object.values(ringchecke)
console.log(ringcheck)
let rings = ringcheck.find(rings => rings == args[1]);
if (!rings) {
  await message.channel.send(`Hurra! Girdiğin ${args[1]} koduna sahip yüzüğü eşya çantanda bulamadım **${message.author.username}**!`).then(x => x.delete({timeout: 3000}))
  message.react(denymoji)
  return
 }
await db.pull(`bank.properties.${message.author.id}.rings`, args[1]).catch(err => console.log(err))

await db.set(`marry.waiting.${kod}`, {
  Sender: message.author.id,
  Responder: member.id,
  Ring: args[1],
  Code: kod
})
message.channel.send(`${member} Önemli bir durum var! :warning:`, new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("EC6969").setDescription(`${message.author.tag} üyesinden bir evlilik teklifi geldi. Bu teklifi kabul etmek için \`evlilik kabul ${kod}\`, reddetmek için \`evlilik red ${kod}\` komutunu kullanmalısın.`))


  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["evlilik","marry","marriage","marries","evlen"]
};

module.exports.help = {
  name: 'evlilik',
  help: 'Seçtiğiniz üyeyle evlenmek veya boşanmak için.',
  usage: 'evlilik [@üye/kabul <kod>/red <kod>/bilgi]',
  category: 'Other'
};
