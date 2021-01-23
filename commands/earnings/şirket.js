const { MessageEmbed, Client, Message } = require("discord.js");
const ms = require("parse-ms")
const { DatabaseManager } = require("@aloshai/mongosha")
const db = DatabaseManager.getDatabase("ECONOMY")
const code = require("@codedipper/random-code")



/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.run = async (client, message, args) => {

// Bakiye Kontrol Bölümü
var membercode = await db.get(`bank.account.${message.author.id}`)
var currentfunds = await db.get(`bank.${membercode}.funds`)

// Info Bİlgisi Almak İçin (Company Kayıt Bazlı)
var companycode = await db.get(`companycodes.${message.author.id}`)
var fetchcompany = await db.get(`company.${companycode}`)

// Info Bilgisi Almak İçin (Member Kayıt Bazlı)
var fetchmembercompany = await db.get(`userc.company.${message.author.id}`)

// Şirkette bulunanları çektirmek için
var memberlist = await db.get(`companymembers.${companycode}`)


  let embed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setDescription(`Selam! Bir argüman belirtmek zorundasın. Kullanabileceğin argümanlar şunlardır: \`kur, davet [kabul/red], yükseltme, kov, çık\``)
  .setColor("BLUE")

  if (!args[0]) return message.channel.send(embed)

  if (args[0] === "kur") {
if (currentfunds < 100000) return message.channel.send(`Hurra! Bir şirket kurmak için en az \`100.000\` **SC**'ye ihtiyacın var **${message.author.username}**! Sende şu an ${currentfunds} **SC** var.`) 
if (companycode) return message.channel.send(`Hurra! Zaten bir şirketin var **${message.author.username}**!`)
if (fetchcompany) return message.channel.send(`Hurra! Zaten bir şirketin var **${message.author.username}**!`)
if (fetchmembercompany) return message.channel.send(`Hurra! Zaten bir şirketin var **${message.author.username}**!`)
if (!args[1]) return message.channel.send(`Hurra! Bir şirket ismi girmelisin **${message.author.username}**!`)
if (args[2]) return message.channel.send(`Hurra! Tek argüman bir isim girebilirsin **${message.author.username}**!`)

await db.add(`bank.${membercode}.funds`, -100000)
let kod = code(6, ["0","1","2","3","4","5","6"])
await db.set(`companycodes.${message.author.id}`, kod)
await db.push(`companymembers.${kod}`, message.author.id)
await db.set(`userc.company.${message.author.id}`, {
  Name: args[1],
  Author: message.author.id
}) 
await db.set(`company.${kod}`, {
  Name: args[1],
  Author: message.author.id
})
await db.set(`levels.company.${kod}`, 1)

message.channel.send(`Hehe! Her şey tamam patronum **${message.author.username}**! \n\n\`•\` Ad: ${args[1]} \n\`•\` Seviye: 1`)
}

if (args[0] === "davet") {
  let member = message.mentions.members.first() || message.member
  let membercode = await db.get(`companycodes.${member.id}`)
  if (membercode) return message.channel.send(`Hurra! Senin bir şirketin var **${member.user.username}**!`)

  if (args[1] === "kabul") {
    if (!args[2]) return message.channel.send(`Hurra! Bir kod girmen gerekiyor **${message.author.username}**!`)
    let başvuru = await db.get(`waiting.company.${args[2]}`)
    if (!başvuru) return message.channel.send(`Hurra! Girdiğin ${args[2]} koduyla ilgili herhangi bir istek yok.`)
    if (başvuru.Responder !== message.author.id) return message.channel.send(`Hurra! Sen bu daveti kabul edebilecek yetkiye sahip değilsin **${message.author.username}**!`)
    let bilgi = await db.get(`company.${başvuru.Company}`)

    await db.set(`companycodes.${message.author.id}`, başvuru.Company)
    await db.push(`companymembers.${başvuru.Company}`, message.author.id)
    await db.set(`userc.company.${message.author.id}`, {
       Name: bilgi.Name,
       Author: bilgi.Author
    })
    /*
    await db.set(`company.${başvuru.Company}`, {
      Name: bilgi.Name,
      Author: bilgi.Author
   })
   */

   message.channel.send(`Hurra! Başarıyla \`${args[2]}\` numaralı şirket isteğini **kabul** ettin **${message.author.username}**!`)
    await db.delete(`waiting.company.${args[2]}`)
    return
  }

  if (args[1] === "red") {
    if (!args[2]) return message.channel.send(`Hurra! Bir kod girmen gerekiyor **${message.author.username}**!`)
    let başvuru = await db.get(`waiting.company.${args[2]}`)
    if (!başvuru) return message.channel.send(`Hurra! Girdiğin ${args[2]} koduyla ilgili herhangi bir istek yok.`)
    if (başvuru.Responder !== message.author.id) return message.channel.send(`Hurra! Sen bu daveti reddedebilecek yetkiye sahip değilsin **${message.author.username}**!`)
    await db.delete(`waiting.company.${args[2]}`)
    message.channel.send(`Hurra! Başarıyla \`${args[1]}\` numaralı şirketi reddettin **${message.author.username}**!`)
    return
  }

  if (!member) return message.channel.send(`Hurra! Davet edeceğin bir üyeyi etiketlemeyi unuttun **${message.author.username}**!`)
  if (!fetchcompany) return message.channel.send(`Hurra! Senin bir şirketin yok **${message.author.username}**!`)

  let kod = code(6, ["0","1","2","3","4","5","6"])
await db.set(`waiting.company.${kod}`, {
  Sender: message.author.id,
  Responder: member.id,
  Company: companycode
})

let level = await db.get(`levels.company.${companycode}`)

message.channel.send(`Ben 2. Noter \`Yusuf\`. Buraya bir şirkete katılım işlemi olduğu için geldim. ${message.author} tarafından bir davetin var ${member}! Aşağıda bilgilerini görebilirsin. 
\`•\` Şirketin Adı: ${fetchcompany.Name} \n\`•\` Şirketin Seviyesi: ${level} \n\`•\`Şirketin Kurucusu: <@${fetchcompany.Author}>

Kabul etmek veya reddetmek için kodun: \`${kod}\`
 \`davet kabul <kod>\` veya \`davet red <kod>\` argümanlarını kullanabilirsin.
`)
return
}

if (args[0] === "yükselt") {
  if (!fetchcompany) return message.channel.send(`Hurra! Senin bir şirketin yok **${message.author.username}**!`)
  let informatcja = await db.get(`company.${companycode}`)
  if (!informatcja) return message.channel.send(`Hurra! Senin bir şirketin yok **${message.author.username}**!`)
  let level = await db.get(`levels.company.${companycode}`)

  if (level == 1) {
    if (currentfunds < 1000000) return message.channel.send(`Hurra! Şirketini ikinci seviyeye yükseltmek için en az \`1.000.000\` **SC**'ye ihtiyacın var **${message.author.username}**! Sende şu an ${currentfunds} **SC** var.`) 
    await db.delete(`bank.${membercode}.funds`, -1000000)
    await db.set(`levels.company.${companycode}`, 2)

    message.channel.send(`Hurra! Şirket seviyeni başarıyla **\`2.\`** seviyeye yükselttin **${message.author.username}**!`)
    return
  }

  if (level == 2) {
    if (currentfunds < 5000000) return message.channel.send(`Hurra! Şirketini ikinci seviyeye yükseltmek için en az \`5.000.000\` **SC**'ye ihtiyacın var **${message.author.username}**! Sende şu an ${currentfunds} **SC** var.`) 
    await db.delete(`bank.${membercode}.funds`, -5000000)
    await db.set(`levels.company.${companycode}`, 3)

    message.channel.send(`Hurra! Şirket seviyeni başarıyla **\`3.\`** seviyeye yükselttin **${message.author.username}**!`)
    return
  }

  message.channel.send(`Olamaz! Şirketinin seviyesi yükseltilemeyecek kadar yüksekte **${message.author.username}**!`)
  return
}

if (args[0] === "maaş") {
  let timeout = 8000000
  let bump = await db.get(`cooldowns.company.${message.author.id}`)
  if (bump !== null && timeout - (Date.now() - bump) > 0) {
    let time = ms(timeout - (Date.now() - bump))
    return message.channel.send(`Hurra! Şirketten maaşını almak için süren dolmadı **${message.author.username}**! Lütfen ${time.hours} saat, ${time.minutes} dakika, ${time.seconds} saniye bekle.`)
  }
  let level = await db.get(`levels.company.${companycode}`)

  if (level == 1) {
    let money = Math.floor(Math.random() * 10000)
    await db.add(`bank.${membercode}.funds`, +money)
    message.channel.send(`Hurra! Başarıyla şirketten maaşını aldın **${message.author.username}**! Toplam gelirin **\`${money}\` SC** oldu.`)
    await db.set(`cooldowns.company.${message.author.id}`, Date.now())
    return
  }

  if (level == 2) {
    let money = Math.floor(Math.random() * 100000)
    await db.add(`bank.${membercode}.funds`, +money)
    message.channel.send(`Hurra! Başarıyla şirketten maaşını aldın **${message.author.username}**! Toplam gelirin **\`${money}\` SC** oldu.`)
    await db.set(`cooldowns.company.${message.author.id}`, Date.now())
    return
  }

  if (level == 3) {
    let money = Math.floor(Math.random() * 1000000)
    await db.add(`bank.${membercode}.funds`, +money)
    message.channel.send(`Hurra! Başarıyla şirketten maaşını aldın **${message.author.username}**! Toplam gelirin **\`${money}\` SC** oldu.`)
    await db.set(`cooldowns.company.${message.author.id}`, Date.now())
    return
  }
message.channel.send(`Hey! Maaş alabileceğin bir şirket bulamadım **${message.author.username}**!`)
return
}

if (args[0] === "kov") {
  if (fetchcompany.Author !== message.author.id) return message.channel.send(`Hurra! Sen bulunduğun şirkette kurucu vasfında değilsin **${message.author.username}**!`)
  let member = message.mentions.members.first()
  if (!member) return message.channel.send(`Hurra! Bir üyeyi etiketlemelisin **${message.author.username}**!`)
  let members = await db.get(`companymembers.${companycode}`)
  let arraylist = Object.values(members)
  let check = arraylist.find(erdemoc => erdemoc == member.id)
  if (!check) {
message.channel.send(`Hurra! Girdiğin üyeyi senin şirketinde bulamadım **${message.author.username}**!`)
return
  }
  if (check) {
    await db.delete(`userc.company.${member.id}`)
    await db.pull(`companymembers.${companycode}`, member.id)
    await db.delete(`companycodes.${member.id}`)

    message.channel.send(`Hurra! Başarıyla dediğin üyeyi şirketten çıkardın **${message.author.username}**!`)
    return
  }
  return
}

if (args[0] === "çık") {
  if (!companycode) return message.channel.send(`Bir şirketten çıkabilmek için bir şirkette olmak zorundasın **${message.author.username}**!`)
  let members = await db.get(`companymembers.${companycode}`)
  let arraylist = Object.values(members)
  let check = arraylist.find(erdemoc => erdemoc == message.author.id)
  if (!check) return message.channel.send(`Hurra! Senin bir şirketin var ama kayıtlı değilsin **${message.author.username}**! Bu bir bug, bunu bize bildir.`)
  if (check) {
    await db.pull(`companymembers.${companycode}`, message.author.id)
    await db.delete(`userc.company.${message.author.id}`)
    await db.delete(`companycodes.${message.author.id}`)
    message.channel.send(`Başarıyla bulunduğun şirketten ayrıldın **${message.author.username}**!`)
    return
  }
}


if (args[0] === "bilgi") {
  if (!companycode) return message.channel.send(`Hurra! Bir şirkette değilsin **${message.author.username}**!`)
  let level = await db.get(`levels.company.${companycode}`)
  let members = memberlist.filter(x => x !== fetchcompany.Author).map((value) => `  **-** \`${client.users.cache.get(value).tag}\``)
  message.channel.send(`Selam ${message.author}! Ben şirketlerin Genel Asistanı \`İrem\`, sana yardım edebilmek için buradayım. Aşağıda **${fetchcompany.Name}** şirketi ile ilgili bilgileri öğrenebilirsin.
Şirketinden birisini kovmak için kurucu olmak zorundasın. Kendin çıkmak istersen de \`çık\` argümanını kullanman yeterli olacak.

  \`•\` Şirketin Adı: ${fetchcompany.Name}
  \`•\` Şirketinin Seviyesi: ${level}
  \`•\` Şirketinin Üyeleri: \n   **-** \`${client.users.cache.get(fetchcompany.Author).tag}\` **(Kurucu)** \n ${members.join("\n")}
  `)
}

  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["şirket"]
};

module.exports.help = {
  name: 'şirket',
  help: 'Şirket seçenekleri ve dahası.',
  usage: 'şirket [kur/bilgi/maaş/teklif <kabul/red> <kod>/yükselt/kov/çık]',
  category: 'Earnings'
};
