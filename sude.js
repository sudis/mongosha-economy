const { Collection, MessageEmbed, Client } = require('discord.js');

const client = new Client();
require('./util/eventLoader.js')(client);

const moment = require('moment');
const fs = require('fs');

const settings = require("./settings.json")

const cli = require("cli-color");
const load = cli.green.bold
const bgLoad = cli.bgWhite.black
const cmds = cli.yellow
const token = cli.cyan
const error = cli.redBright

const log = message => {
  console.log(bgLoad(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`) + ` ${message}`);
};

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    fs.readdir(`./commands/${f}/`, (err, filess) => {
      if (err) console.error(err);
      log(load(`${filess.length} command will be loaded from commands/${f} folder.`));
      filess.forEach(fs => {
        let props = require(`./commands/${f}/${fs}`);
        log(cmds(`Loaded: ${props.help.name}.`));
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
  });
});



const { DatabaseManager } = require("@aloshai/mongosha");

DatabaseManager.connect(settings.botSettings.mongoURL).then(async () => {
  client.login(settings.botSettings.token).then(() => {
    console.log(bgLoad(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`) + token(` Successfully connected to the token.`));
  }).catch((err) => {
    console.log(bgLoad(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`) + error(` Couldn't connect to token! ${err}`));
  });
});

Array.prototype.random = function() {
  return this[(Math.floor(Math.random()*this.length))];
};