const {Client} = require("discord.js");
const settings = require("../settings.json")

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  client.user.setPresence({ activity: { name: settings.botSettings.botStatus }, status: "dnd" });
  let channel = client.channels.cache.get(settings.botSettings.botVoiceChannelID);
  if(channel) channel.join();
};