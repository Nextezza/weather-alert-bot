module.exports = async (client) => {
  client.on("ready", async () => {
    console.log(`[+] ${client.user.tag} has logged on.`);
  });
};
