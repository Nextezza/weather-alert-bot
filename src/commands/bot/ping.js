module.exports = {
  name: "ping",
  aliases: [`pong`, `speed`],
  owner: false,
  run: async (client, message, args) => {
    message.channel.send(`🏓 Pong! ${client.ws.ping}ms`);
  },
};
