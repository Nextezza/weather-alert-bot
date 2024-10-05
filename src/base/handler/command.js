const { readdirSync, statSync } = require("fs");
const path = require("path");

const loadCommands = (client) => {
  let commandCount = 0;

  const readCommands = (directory) => {
    const filesAndDirs = readdirSync(directory);

    for (const item of filesAndDirs) {
      const fullPath = path.join(directory, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        readCommands(fullPath);
      } else if (item.endsWith(".js")) {
        const cmd = require(fullPath);
        client.commands.set(cmd.name, cmd);
        commandCount++;
      }
    }
  };

  const commandsPath = path.join(__dirname, "../../commands");
  readCommands(commandsPath);

  return { commandCount };
};

module.exports = { loadCommands };
