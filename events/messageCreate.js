require('dotenv').config()
const { Events } = require('discord.js')
const { interact } = require('../utils/dialogapi.js')

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) {
      return
    }

    if (
      message.client.user.id === process.env.APP_ID &&
      message.channel.type === 1
    ) {
      console.log('DM BOT')
      await interact(message, message.author.id, false)
      return
    }

    const mentionedUser = message.mentions.users.get(process.env.APP_ID)
    if (mentionedUser && mentionedUser.bot) {
      console.log('Mencionar al BOT')
      await interact(message, message.author.id, false)
      return
    }

    if (message.content.includes('##secret##')) {
      message.author.send(`Hola ${message.author.username}!`).catch((error) => {
        console.log(`No se puede mandar DM para ${message.author.tag}.`)
        console.error(error)
      })
      return
    }

    if (process.env.LIVEANSWERS_CHANNELS.includes(message.channel.id)) {
      let liveAnswer = message
      liveAnswer.isLive = true
      const messageWithoutMention = message.content
        .replace(/^<@\!?(\d+)>/, '')
        .trim()

      await interact(
        liveAnswer,
        message.author.id,
        false,
        false,
        true,
        messageWithoutMention
      )
    }
  },
}
