"use strict";
const http = require('http');
const Bot = require('messenger-bot');
const request = require('request');

let bot = new Bot({
  verify: 'myntra_bot',
  token: 'CAALiIkjYEW0BAKBiHTSjriO14VJvcNGBGaBNvHWXyKvfHHNEZAu5ZAZCaLSZCsYPtGZBZB3vSzgVKwZBk1x6kabZBgNhyUZCYa2T4evCJYuqAO82sMEBruTziNYp1jfbDiHZBgS0wQ7TLHeaw7uwZBpCmG1su4OZCJyzSvV4ZC592zP3dqao4MIKssBRRZBbIy59ZBLfnEZD'
})

bot.on('message', (payload, reply) => {
  let txt = payload.message.text
  console.log("--"+ txt);
  request('http://developer.myntra.com/v2/search/data/men-casual-shirts?userQuery=false&rows=2', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var search_response = JSON.parse(body);
        console.log("response:" + search_response);
        var products = search_response.data.results.products;
        console.log(products);
        var first_product = products[0].product;
        reply({ text: first_product }, (err) => {
          if (err) throw err
          console.log(`Sent ${profile.first_name} ${profile.last_name}: ${text}`)
        })    
      }
    });  
  })


http.createServer(bot.middleware()).listen(3000)