"use strict";
const http = require('http');
const Bot = require('messenger-bot');
const request = require('request');
const search = require('./search');
var app = require('express')();
var LEX = require('letsencrypt-express');
var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc'
, approveRegistration: function (hostname, cb) { // leave `null` to disable automatic registration
    // Note: this is the place to check your database to get the user associated with this domain
    cb(null, {
      domains: [hostname]
    , email: 'CHANGE_ME' // user@example.com
    , agreeTos: true
    });
  }
});

lex.onRequest = app;
app.use(function (req, res) {
  res.send({ success: true });
});
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'myntra_bot') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

let bot = new Bot({
  verify: 'myntra_bot',
  token: 'CAALiIkjYEW0BAOW8uyvBDDbc7urRruwNXEMC7dypYP1VRjUM9nTw2dmsvNBn8XZA1lH6xNIDNXmKfIW6EZBQdnxqOZAKV9atQ9gsy0jw6eyVaCCZBsTeImZBHjtk4lfar3S8VZCDpieYx7ZAsLnZAKGuf2ZBIX7X0AfyiMLxulpUHtR5eO8F7FCk02jGs7pzYY9gZD',
})

bot.on('message', (payload, reply) => {
  console.log("Somewhere in bot.on");
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
lex.listen([80], [443, 5001], function () {
  var protocol = ('requestCert' in this) ? 'https': 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});
//http.createServer(bot.middleware()).listen(3000)