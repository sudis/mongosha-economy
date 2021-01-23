const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../settings.json");
const emojis = require("../../emojis.json")
const { DatabaseManager } = require("@aloshai/mongosha");
const { METHODS } = require("snekfetch");
const db = DatabaseManager.getDatabase("ECONOMY")


/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

  let checke = await db.get(`bank.account.${message.author.id}`)
  if (!checke) {
    message.channel.send(`Tüh ya! Bu eylemi gerçekleştirmek için bir banka hesabına sahip olmalısın **${message.author.username}**!`)
    return
  }

  let membercode = await db.get(`bank.account.${message.author.id}`)
  let balance = await db.get(`bank.${membercode}.funds`)
  let check = await db.get(`bank.properties.${message.author.id}.rings`)

  if (args[0] === "yüzük") {


if (args[1] === "al") {

  if (args[2] === "AAAA") {
    if (100 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` .var`)

    await db.add(`bank.${membercode}.funds`, -100)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAA")
    message.channel.send(`Seni ne kadar idare eder bilmiyorum... Al bakalım <:lv1:799562415548661770>`)
    return
  }
  
  if (args[2] === "AAAB") {
    if (500 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -500)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAB")
    message.channel.send(`Yüzük kısmını daha yeni yapmıştım. Sıcak olabilir dikkat et <:lv2:799562419474268200>`)
    return
  }

  if (args[2] === "AAAC") {
    if (15000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -15000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAC")
    message.channel.send(`Maliyetten kıstığımı kimseye söyleme <:lv3:799562443646566411>`)
    return
  }

  if (args[2] === "AAAD") {
    if (50000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -50000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAD")
    message.channel.send(`Normal demir dökümden daha sağlam yaptım <:lv4:799562445231751178>`)
    return
  }

  if (args[2] === "AAAE") {
    if (100000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -100000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAE")
    message.channel.send(`Normalde platini pek sevmiyorum fakat yine de nasıl istiyorsan öyle olsun <:lv5:799562445467025420>`)
    return
  }

  if (args[2] === "AAAF") {
    if (120000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -120000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAF")
    message.channel.send(`Yaldız normalde pek iyi değil ya ama yine de al bakalım <:lv6:799562445621559337>`)
    return
  }

  if (args[2] === "AAAG") {
    if (150000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -150000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAG")
    message.channel.send(`Parıl parıl parlıyor kafam karışıyor. Ne olduğunu bilmediğim bir maddeden yaptım <:lv7:799562446264205342>`)
    return
  }

  if (args[2] === "AAAH") {
    if (250000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -250000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAH")
    message.channel.send(`Fasilyus gerçekten namert bir hırsızdı. Onun yüzüğünü çalanın hayat iksiri elde ettiğine dair sözler var <:lv8:799562437992120320>`)
    return
  }

  if (args[2] === "AAAI") {
    if (500000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -500000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AAAI")
    message.channel.send(`Konfiçyus bilgeliğiyle tanınan birisiydi. Onun yüzüğünde hayatın bütün sırlarını bulabilirsin <:lv9:799562436487020554>`)
    return
  }

  if (args[2] === "AABA") {
    if (1000000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)

    await db.add(`bank.${membercode}.funds`, -1000000)
    await db.push(`bank.properties.${message.author.id}.rings`, "AABA")
    message.channel.send(`Fazilet çok çekti, çok yaşadı ve çok gördü. Buna değdi mi <:lv10:799562439355138080>`)
    return
  }

}

if (args[1] === "sil") {
  message.channel.send(`Herhangi bir yüzük üstüne kayıtlıysa silinmiştir.`)
  await db.delete(`bank.properties.${message.author.id}.rings`)
  return
}

let lv11 = client.emojis.cache.get(emojis.rings.lv1)
let lv12 = client.emojis.cache.get(emojis.rings.lv2)
let lv13 = client.emojis.cache.get(emojis.rings.lv3)
let lv14 = client.emojis.cache.get(emojis.rings.lv4)
let lv15 = client.emojis.cache.get(emojis.rings.lv5)
let lv16 = client.emojis.cache.get(emojis.rings.lv6)
let lv17 = client.emojis.cache.get(emojis.rings.lv7)
let lv18 = client.emojis.cache.get(emojis.rings.lv8)
let lv19 = client.emojis.cache.get(emojis.rings.lv9)
let lv110 = client.emojis.cache.get(emojis.rings.lv10)

 let rings = new MessageEmbed()
 .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
 .setTitle(`Yüzük Dükkanı`)
 .setDescription(`Pheh, pheh! Ben yükseklerin lideri \`March Dukke\`. Evet ben bir düktüm ama artık sadece yüzük satıcısıyım. Her neyse, sana nasıl yardımcı olabilirim?

 \`AAAA\` ${lv11} Tahta Alaşım Yüzük (100 SP)
 \`AAAB\` ${lv12} Bakır Alaşım Yüzük (500 SP)
 \`AAAC\` ${lv13} Pirinç karışımlı Bakır Alaşım Yüzük (15.000 SP)
 \`AAAD\` ${lv14} Demir Has Yüzük (50.000 SP)
 \`AAAE\` ${lv15} Platin Kaplama Yüzük (100.000 SP)
 \`AAAF\` ${lv16} Yaldızlı Yüzük (120.000 SP)
 \`AAAG\` ${lv17} Elmas Yüzük (150.000 SP)
 \`AAAH\` ${lv18}Fasilyus'un Kırmızı Nahçıvan Yüzüğü (250.000 SP)
 \`AAAI\` ${lv19} Konfiçyus'un Bilge Yüzüğü (500.000 SP)
 \`AABA\` ${lv110} Fazilet'in Safir Yüzüğü (1.000.000 SP)

 Bir yüzük almak için \`market yüzük al <yüzük kodu>\` yazabilirsin. Üzerindeki bir yüzüğü silmek için \`yüzük sil\` komutunu kullan. 
 `)
.setColor("BLUE")


message.channel.send(rings)
return
}

if (args[0] === "unvan") {

  if (args[1] === "al") {

    if (args[2] === "AABB") {
      if (50000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)
      let checking = await db.get(`bank.properties.${message.author.id}.titles.owned`)
      if (checking !== undefined) {
      let check = Object.values(checking) 
      if (check.includes("AABB")) return message.channel.send(`Sen bu unvanı zaten daha önce almışsın.`)
    }
      await db.push(`bank.properties.${message.author.id}.titles.owned`, "AABB")
      await db.add(`bank.${membercode}.funds`, -50000)
      await db.push(`bank.properties.${message.author.id}.titles.list`, "AABB")
      message.channel.send(`Galiba buralarda yenisin? Al bakalım <:rozetother:799603119733997590>`)
      return
    }

    if (args[2] === "AABC") {
      if (150000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)
      let checking = await db.get(`bank.properties.${message.author.id}.titles.owned`)
      if (checking !== undefined) {
        let check = Object.values(checking) 
        if (check.includes("AABC")) return message.channel.send(`Sen bu unvanı zaten daha önce almışsın.`)
      }
      await db.push(`bank.properties.${message.author.id}.titles.owned`, "AABC")
      await db.add(`bank.${membercode}.funds`, -50000)
      await db.push(`bank.properties.${message.author.id}.titles.list`, "AABC")
      message.channel.send(`Bu unvanı en son alan kişi ölmüştü ama sana ne olur bilemem <:rozetdefault:799603118878883840>`)
      return
    }

    if (args[2] === "AABD") {
      if (500000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)
      let checking = await db.get(`bank.properties.${message.author.id}.titles.owned`)
      if (checking !== undefined) {
        let check = Object.values(checking) 
        if (check.includes("AABD")) return message.channel.send(`Sen bu unvanı zaten daha önce almışsın.`)
      }
      await db.push(`bank.properties.${message.author.id}.titles.owned`, "AABD")
      await db.add(`bank.${membercode}.funds`, -50000)
      await db.push(`bank.properties.${message.author.id}.titles.list`, "AABD")
      message.channel.send(`Normalde fazla bir değeri yok ama benim için özel <:rozetdukke:799603125886386198>`)
      return
    }

    if (args[2] === "AABE") {
      if (1000000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)
      let checking = await db.get(`bank.properties.${message.author.id}.titles.owned`)
      if (checking !== undefined) {
        let check = Object.values(checking) 
        if (check.includes("AABE")) return message.channel.send(`Sen bu unvanı zaten daha önce almışsın.`)
      }
      await db.push(`bank.properties.${message.author.id}.titles.owned`, "AABE")
      await db.add(`bank.${membercode}.funds`, -50000)
      await db.push(`bank.properties.${message.author.id}.titles.list`, "AABE")
      message.channel.send(`Garip bir hikayesi var okumak istersen <:rozetsevgici:799603126805856256>`)
      return
    }

    if (args[2] === "AABF") {
      if (5000000 > balance) return message.channel.send(`Hey! Şu an zaten bankanda \`${balance}\` var.`)
      let checking = await db.get(`bank.properties.${message.author.id}.titles.owned`)
      if (checking !== undefined) {
        let check = Object.values(checking) 
        if (check.includes("AABF")) return message.channel.send(`Sen bu unvanı zaten daha önce almışsın.`)
      }
      await db.push(`bank.properties.${message.author.id}.titles.owned`, "AABF")
      await db.add(`bank.${membercode}.funds`, -50000)
      await db.push(`bank.properties.${message.author.id}.titles.list`, "AABF")
      message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Başarıyla **Onaylı Satıcı** durumunu aktifleştirdin. Artık profilin değişti ve daha fazla tutarda para aktarımı yapabiliyorsun.`).setColor("GOLD"))
      return
    }
  }

  if (args[1] === "görüntüle") {
    let member = message.mentions.members.first() || message.member
    let array = await db.get(`bank.properties.${member.id}.titles.list`)
    console.log(array)
    return
  }

  let title1 = client.emojis.cache.get(emojis.titles.title1)
  let title2 = client.emojis.cache.get(emojis.titles.title2)
  let title3 = client.emojis.cache.get(emojis.titles.title3)
  let title4 = client.emojis.cache.get(emojis.titles.title4)
  let title5 = client.emojis.cache.get(emojis.titles.title5)


    let titles = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setTitle(`Unvan Dükkanı`)
    .setColor("BLUE")
    .setDescription(`Unvan Dükkanı'ndasın dur bakalım. Sen kimsin? Ya da cevap verme seni sevmeyeceğim kesin. Benim adım kızgın \`Alosha\` ama sen bana hiç bir şey diye seslenme. Seslenmelerden nefret ederim.

    \`AABB\` ${title1} Tecrübeli Oyuncu (50.000 SP)
    \`AABC\` ${title2} Hırs Delisi (150.000 SP)
    \`AABD\` ${title3} Katil Meddhaun (500.000 SP)
    \`AABE\` ${title4} Sevgili Circi (1.000.000 SP)
    \`AABF\` ${title5} **Onaylı Satıcı** (5.000.000 SP) **[SUPER]**

    Unvanlar sizi daha hoş gösterirler ve güvenilebilirliliğinizi arttırırlar. YÜzük almak için \`market unvan al <unvan kodu>\` yazabilirsin. 
    `)
    message.channel.send(titles)
    return
  

}

let informatcja = new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setTitle(`Büyük Market`)
.setDescription(`Markete hoş geldin! Ben yardımcı \`Noeul\`. Sana bir şeyler satmak için burdayım. Para nakit demektir ve nakiti herkes sever değil mi? Lanet olası haşereler evimi basmadan önce daha fazla eşyam olduğuna yemin edebilirim. Ne diyorduk? Ha işte senin için market listesi.

**Yüzük Marketi** (\`market yüzük\`)
\`>\` Yüzük Marketi'nden evlilik için yüzük alabilirsin. Bu yüzüklerin bazıları büyülü \`OwO\` bazıları da normal. Yine de kafana göre bir yüzük alabilirsin. Bu marketin sahibi biraz huysuz birisi dikaktli ol.

**Unvan Marketi** (\`market unvan\`)
\`>\` Unvan Marketi'nden kendine özel unvanlar alabilirsin. Ne kadar havalı hehe. 
`)
.setColor("BLUE")
.setTimestamp()

message.channel.send(informatcja)

}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["market","marketplace"]
};

module.exports.help = {
  name: 'market',
  help: 'Market yardımıyla bir şeyler alabilirsiniz.',
  usage: 'market [yüzük/unvan] (al) (<kod>)',
  category: 'Items'
};
