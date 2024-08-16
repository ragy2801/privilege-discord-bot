const { SlashCommandBuilder } = require('discord.js')
const { interact } = require('../utils/dialogapi.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pregunta')
    .setDescription('Preguntale al bot sobre algo.')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('Pregunta del usuario')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true })
    await interact(interaction, interaction.user.id, true)
  },
}
