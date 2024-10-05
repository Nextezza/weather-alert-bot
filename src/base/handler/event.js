const { readdirSync } = require("fs");

const loadEvents = (client) => {
  let eventCount = 0;

  readdirSync("src/events").forEach((dir) => {
    const eventFiles = readdirSync(`src/events/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of eventFiles) {
      try {
        const event = require(`../../events/${dir}/${file}`);
        event(client);
        eventCount++;
      } catch (error) {
        console.error(`Error loading event ${file}: ${error.message}`);
      }
    }
  });

  return { eventCount };
};

module.exports = { loadEvents };
