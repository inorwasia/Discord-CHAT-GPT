import { Client, GatewayIntentBits } from "discord.js";
import { ChatGPT } from "discord-chat-gpt";

// creating client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // for guild
    GatewayIntentBits.GuildMembers, // for guild members
    GatewayIntentBits.GuildMessages, // for guild messages
    GatewayIntentBits.MessageContent, // for access message content from channel or member
  ],
  allowedMentions: {
    repliedUser: false, // it will not ping you in reply
  },
});

const gptClient = new ChatGPT({
  apiKey: "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",
  orgKey: "org-EMlitDSuiEs3MmeXN43zHDtI",
});

// checking if bot online console bot is online
client.on("ready", () => {
  console.log(`> ${client.user.username} is Online !!`);
});

// now lets handle chat bot system
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  let ChannelID = "1142630668447273121";
  let channel = message.guild.channels.cache.get(ChannelID);
  if (!channel) return;

  if (message.channel.id === channel.id) {
    let msg = await message.reply({
      content: `Loading Wait..`,
    });
    let reply = await gptClient.chat(message.content, message.author.username); // it will return text
    msg.edit({
      content: `${reply}`,
    });
  }
});

// now login in bot
client.login("MTEwMzcyNDk0MDM0OTQxOTYyMA.GpEkAm.apomG82G_bjrb8krDvEdnqsi89QY35kM14dCdM");