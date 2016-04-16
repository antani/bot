var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    app = express();


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
