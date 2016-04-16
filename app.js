//
var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    request = require('request'),
    app = express();

// You MUST change these values, consult the Messenger Platform Getting Started guide
var verify_token = 'myntra_bot';
var token = "CAALiIkjYEW0BAKBiHTSjriO14VJvcNGBGaBNvHWXyKvfHHNEZAu5ZAZCaLSZCsYPtGZBZB3vSzgVKwZBk1x6kabZBgNhyUZCYa2T4evCJYuqAO82sMEBruTziNYp1jfbDiHZBgS0wQ7TLHeaw7uwZBpCmG1su4OZCJyzSvV4ZC592zP3dqao4MIKssBRRZBbIy59ZBLfnEZD";
app.get('/', function (req, res) {
  res.header('Content-type', 'text/html');
  return res.end('<h1>Hello, Secure World!</h1>');
});
app.listen(3000,function() {
  console.log('Started at 3000');
});
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'myntra_bot') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});
app.post('/webhook/', function (req, res) {
    console.log(req);
    var messaging_events = req.body.entry[0].messaging;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;

        if (event.message && event.message.text) {
            var text = event.message.text;
            console.log(text);
            sendTextMessage(sender, "Echo: " + text.substring(0, 200));
        }
    }
    res.sendStatus(200);
});

function sendTextMessage(sender, text) {

    var messageData = {
        text: text
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }, function (error, response) {

        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }

    });

}
