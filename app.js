"use strict";
const http = require('http');
const Bot = require('messenger-bot');
const request = require('request');

let bot = new Bot({
  verify: 'myntra_bot',
  token: 'CAALiIkjYEW0BAKBiHTSjriO14VJvcNGBGaBNvHWXyKvfHHNEZAu5ZAZCaLSZCsYPtGZBZB3vSzgVKwZBk1x6kabZBgNhyUZCYa2T4evCJYuqAO82sMEBruTziNYp1jfbDiHZBgS0wQ7TLHeaw7uwZBpCmG1su4OZCJyzSvV4ZC592zP3dqao4MIKssBRRZBbIy59ZBLfnEZD'
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text
  request('http://developer.myntra.com/v2/search/data/men-casual-shirts?userQuery=false&rows=2', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        search_response = JSON.parse(body);
        products = search_response.data.results.products;
        reply({ text: products[0].product }, (err) => {
          if (err) throw err
          console.log(`Sent ${profile.first_name} ${profile.last_name}: ${text}`)
        })    
      }
    });  
  })
})

http.createServer(bot.middleware()).listen(3000)