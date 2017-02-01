var express = require('express');

var app = express();
var port = Number(process.env.PORT || 8080);

app.use('/', express.static('public'));

app.get('/api/whoami',function(req,res){
	var theIp = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress,

		theOs = req.headers['user-agent'],

		returnObj = {
			ip_address: theIp,
			language: req.headers['accept-language'].split(',')[0],
			os: theOs.split(' ').slice(1, 4).join(' ').slice(1, -1)
		};

	res.json(returnObj);
});

app.listen(port);