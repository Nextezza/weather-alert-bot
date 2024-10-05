module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.guild) {
      return message.author.send("This command can only be used in a server.");
    }

    const usePrefix = client.prefix;
    const botMentionRegex = RegExp(`^<@!?${client.user.id}>( |)`);
    const isBotMentioned = message.content.match(botMentionRegex);
    const prefixToUse = isBotMentioned
      ? message.content.match(botMentionRegex)[0]
      : usePrefix;

    if (!message.content.startsWith(prefixToUse)) return;

    const args = message.content.slice(prefixToUse.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.owner && !client.owner.includes(message.author.id)) {
      return message.channel.send(
        `❌ | You cannot use this command, this command is \`Owner Only\`.`
      );
    }

    if (command) {
      await command.run(client, message, args, prefixToUse);
    }
  });
};
