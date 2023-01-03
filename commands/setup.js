const { setupThread } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("thread")
        .setDescription("Définir ce channel autorisable pour les threads.")
    )
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "thread":
            if (setupThread.get(interaction.channel.id) === undefined) {
                setupThread.set(interaction.channel.id, interaction.guild.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> ajouté à la liste des channels thread !`,
                    ephemeral: true,
                });
            } else {
                setupThread.delete(interaction.channel.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> supprimé de la liste des channels thread !`,
                    ephemeral: true,
                });
            }
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};
