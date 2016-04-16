"use strict";
const http = require('http');
const Bot = require('messenger-bot');
const request = require('request');
const search = require('./search');

let bot = new Bot({
  verify: 'myntra_bot',
  token: 'CAALiIkjYEW0BAKBiHTSjriO14VJvcNGBGaBNvHWXyKvfHHNEZAu5ZAZCaLSZCsYPtGZBZB3vSzgVKwZBk1x6kabZBgNhyUZCYa2T4evCJYuqAO82sMEBruTziNYp1jfbDiHZBgS0wQ7TLHeaw7uwZBpCmG1su4OZCJyzSvV4ZC592zP3dqao4MIKssBRRZBbIy59ZBLfnEZD'
})

bot.on('message', (payload, reply) => {
  let txt = payload.message.text
  console.log("--"+ txt);
  reply({ text: 'Will show you some good stuff...hold on.' })
  getSearchResults((err, payload) => {
    if (err) throw err
    let element = {
      title: payload.title,
      subtitle: payload.price,
      image_url: payload.image || null,
      buttons: []
    }
    reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [element]
        }
      }
    })
  });
})

http.createServer(bot.middleware()).listen(3000)