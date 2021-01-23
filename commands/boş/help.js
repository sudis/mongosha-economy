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

let bank = client.commands.filter(c=>c.help.category === 'Bank').map(command => `\`${command.help.name}\``)
let games = client.commands.filter(c=>c.help.category === 'Games').map(command => `\`${command.help.name}\``)
let other = client.commands.filter(c=>c.help.category === 'Other').map(command => `\`${command.help.name}\``)
let earnings = client.commands.filter(c=>c.help.category === 'Earnings').map(command => `\`${command.help.name}\``)
let items = client.commands.filter(c=>c.help.category === 'Items').map(command => `\`${command.help.name}\``)

if (args[0] === "banka") {

  let bankargs = client.commands.filter(c=>c.help.category === 'Bank').map(command => `\`•\` Komut: \`${command.help.name}\` \n\`-\` Açıklama: \`${command.help.help}\` \n\`-\` Kullanım: \`${command.help.usage}\``)
  let bankembed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setTitle(`Banka Yardım Menüsü`)
  .setDescription(`Banka Yardım Menüsüne hoş geldin ben Bankacı \`Enis\` sana bankanın nasıl çalıştığını ve komutları göstereceğim.

  ${bankargs.join("\n\n")}
  `)
  .setColor("BLUE")
message.channel.send(bankembed)
return
}

if (args[0] === "kazançlar") {

  let bankargs = client.commands.filter(c=>c.help.category === 'Earnings').map(command => `\`•\` Komut: \`${command.help.name}\` \n\`-\` Açıklama: \`${command.help.help}\` \n\`-\` Kullanım: \`${command.help.usage}\``)
  let bankembed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setTitle(`Kazanç Yardım Menüsü`)
  .setDescription(`Kazanç Yardım Menüsüne hoş geldin ben Kazanç Uzmanı \`Barış\` kolay yoldan para kazanamazsın değil mi hehe?

  ${bankargs.join("\n\n")}
  `)
  .setColor("BLUE")
message.channel.send(bankembed)
return
}

if (args[0] === "oyunlar") {

  let bankargs = client.commands.filter(c=>c.help.category === 'Games').map(command => `\`•\` Komut: \`${command.help.name}\` \n\`-\` Açıklama: \`${command.help.help}\` \n\`-\` Kullanım: \`${command.help.usage}\``)
  let bankembed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setTitle(`Oyunlar Yardım Menüsü`)
  .setDescription(`Oyunlar Yardım Menüsüne hoş geldin ben Poker Delisi \`Heimdall\` en sevdiğim koku yeni deste açıldığında ortaya yayılan kağıt kokusudur.

  ${bankargs.join("\n\n")}
  `)
  .setColor("BLUE")
message.channel.send(bankembed)
return
}

if (args[0] === "eşyalar") {

  let bankargs = client.commands.filter(c=>c.help.category === 'Items').map(command => `\`•\` Komut: \`${command.help.name}\` \n\`-\` Açıklama: \`${command.help.help}\` \n\`-\` Kullanım: \`${command.help.usage}\``)
  let bankembed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setTitle(`Kazanç Yardım Menüsü`)
  .setDescription(`Eşya Yardım Menüsüne hoş geldin ben Antikacı \`Kadir\` bir eşyanın hiç değeri olmaması demek onu satamayacağın anlamına gelmez.

  ${bankargs.join("\n\n")}
  `)
  .setColor("BLUE")
message.channel.send(bankembed)
return
}

if (args[0] === "diğer") {

  let bankargs = client.commands.filter(c=>c.help.category === 'Other').map(command => `\`•\` Komut: \`${command.help.name}\` \n\`-\` Açıklama: \`${command.help.help}\` \n\`-\` Kullanım: \`${command.help.usage}\``)
  let bankembed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setTitle(`Diğer Yardım Menüsü`)
  .setDescription(`Kazanç Yardım Menüsüne hoş geldin ben Evlilik Memuru \`Damla\` evlilik önemli bir müessese! Her neyse sana nasıl yardımcı olabilirim?

  ${bankargs.join("\n\n")}
  `)
  .setColor("BLUE")
message.channel.send(bankembed)
return
}

let embed = new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setTitle(`Ekonomi Yardım Menüsü`)
.setDescription(`Selam! Ben Sude Alaçatı, bu botun yapımcılarından... Bu mesajı okuyorsan bu botu bitirmeyi başardım demektir. Bir çok yardım eden kişiye teşekkürlerimi sunarım. Herhangi bir hata çıkması durumunda bana ulaşabilirsin. (Mutlaka çıkacak hehe.)

**Banka Kategorisi** (\`${bank.length}\`) | \`yardım banka\` |
${bank.join(", ")}

**Kazançlar Kategorisi** (\`${earnings.length}\`) | \`yardım kazançlar\` |
${earnings.join(", ")}

**Oyunlar Kategorisi** (\`${games.length}\`) | \`yardım oyunlar\` |
${games.join(", ")}

**Eşyalar Kategorisi** (\`${items.length}\`) | \`yardım eşyalar\` |
${items.join(", ")}

**Diğer Kategorisi** (\`${other.length}\`) | \`yardım diğer\` |
${other.join(", ")}
`)
.setColor("BLUE")

if (!args[0]) return message.channel.send(embed)


  
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help","yardım"]
};

module.exports.help = {
  name: 'yardım',
  help: 'Komutları ve yardımı görüntülemek için.',
  usage: 'yardım (<kategori ismi>)',
  category: 'Other'
};
