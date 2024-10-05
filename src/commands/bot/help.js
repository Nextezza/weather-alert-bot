const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: [],
  owner: false,
  run: async (client, message, args) => {
    const em = new EmbedBuilder()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle("Help Menu")
      .setDescription("Prefix - w!")
      .addFields(
        {
          name: `Info`,
          value: "`help`, `ping`",
        },
        {
          name: `Weather`,
          value: "`weather <city>`",
        }
      );

    message.channel.send({ embeds: [em] });
  },
};
