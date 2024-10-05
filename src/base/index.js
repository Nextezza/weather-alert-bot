const {
  Client,
  Collection,
  WebhookClient,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const config = require("../assets/config");
const { loadCommands } = require("./handler/command");
const { loadEvents } = require("./handler/event");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [
    Partials.Channel,
    Partials.Guilds,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ],
  allowedMentions: {
    repliedUser: false,
    parse: ["everyone", "roles", "users"],
  },
});

module.exports = client;

client.token = config.token;
client.prefix = config.prefix;
client.color = config.color;
client.owner = config.owner;
client.commands = new Collection();
client.events = new Collection();

console.clear();

(async () => {
  ({ commandCount } = await loadCommands(client));
  ({ eventCount } = await loadEvents(client));

  console.log(`[+] Total Commands Loaded: ${commandCount}`);
  console.log(`[+] Total Events Loaded: ${eventCount}`);

  client.login(client.token);
})();
