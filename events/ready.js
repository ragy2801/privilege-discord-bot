const { Events } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Listo! ${client.user.tag} registrado.`)
  },
}
