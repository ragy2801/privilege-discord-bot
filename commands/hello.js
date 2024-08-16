const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hola')
    .setDescription('Hola Como te puedo ayudar.'),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true })
    await interaction.user
      .send(`Hey ${interaction.user.username}!`)
      .catch((error) => {
        console.log(`Could not send DM to ${interaction.user.tag}.`)
        console.error(error)
      })
    await interaction.editReply({
      content: `Habla conmigo por DM.`,
      ephemeral: true,
    })
  },
}
