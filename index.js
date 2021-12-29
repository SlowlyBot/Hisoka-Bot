const fs = require("fs");
const { Client, Collection, MessageEmbed } = require("discord.js");

const { prefix, token } = require("./config.json");

const client = new Client();

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.once("guildCreate", (guild) => {
  const embed = new MessageEmbed()
    .setTitle("Merci d'avoir ajouté Tutobot à votre serveur !")
    .setColor("BLUE")
    .addField("Commandes", "Faites `!commands` ou `!help`")
    .addField(
      "Retrouvez moi sur",
      "[YouTube](https://youtube.com/c/Pentiminax) et [Twitter](https://twitter.com/Pentiminax)"
    )
    .setFooter("Tutobot", client.user.avatarURL());

  guild.owner.send(embed);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(
      "Une erreur s'est produite pendant l'exécution de la commande !"
    );
  }
});

client.login(process.env.TOKEN);
