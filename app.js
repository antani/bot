"use strict";
const http = require('http');
const Bot = require('messenger-bot');
const request = require('request');
const search = require('./search');

let bot = new Bot({
  verify: 'myntra_bot',
  token: 'CAALiIkjYEW0BAOW8uyvBDDbc7urRruwNXEMC7dypYP1VRjUM9nTw2dmsvNBn8XZA1lH6xNIDNXmKfIW6EZBQdnxqOZAKV9atQ9gsy0jw6eyVaCCZBsTeImZBHjtk4lfar3S8VZCDpieYx7ZAsLnZAKGuf2ZBIX7X0AfyiMLxulpUHtR5eO8F7FCk02jGs7pzYY9gZD',
})

bot.on('message', (payload, reply) => {
  console.log("--"+ payload)
  reply({ text: 'Will show you some good stuff...hold on.' })
  // getSearchResults((err, payload) => {
  //   if (err) throw err
  //   let element = {
  //     title: payload.title,
  //     subtitle: payload.price,
  //     image_url: payload.image || null,
  //     buttons: []
  //   }
  //   reply({
  //     attachment: {
  //       type: 'template',
  //       payload: {
  //         template_type: 'generic',
  //         elements: [element]
  //       }
  //     }
  //   })
  // });
})

http.createServer(bot.middleware()).listen(3000)