const { Discord, Message } = require("discord.js");

module.exports = {
    name: "prune",
    async execute(message, args) {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply("Ce n'est pas un nombre valide !");
        }
        else if (amount <= 1 || amount > 100) {
            return message.reply("Tu dois saisir un nombre compris entre 1 et 99 !");
        }

        message.channel.bulkDelete(amount);
    },
};