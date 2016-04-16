"use strict";
const http = require('http');
const Bot = require('messenger-bot');

let bot = new Bot({
  verify: 'myntra_bot',
  token: 'CAALiIkjYEW0BAKBiHTSjriO14VJvcNGBGaBNvHWXyKvfHHNEZAu5ZAZCaLSZCsYPtGZBZB3vSzgVKwZBk1x6kabZBgNhyUZCYa2T4evCJYuqAO82sMEBruTziNYp1jfbDiHZBgS0wQ7TLHeaw7uwZBpCmG1su4OZCJyzSvV4ZC592zP3dqao4MIKssBRRZBbIy59ZBLfnEZD'
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)