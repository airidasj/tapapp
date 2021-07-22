"use strict";
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/circle/', function(req, res){
    // res.send(noPinPanel);
    console.log('Paspaustas rutuliukas');
});

io.on('connection', function(client){

	// console.log('Connected ==> ', client);

	client.on('circleInfo', function(data){
    
	    console.log('INfo in server ======> ', data);
	   	// server.broadcast.emit('newCircle', data);
	   	client.broadcast.emit('newCircle', data);
	
	});

});





// server.on('circleInfo', function(data){
    
//     console.log('INfo in server ======> ', data);
// });

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

// General Comments:
// Note that in scss files, the panel width is 2000vw - meaning
// that only 20 panels can be used in a sequence...

app.use('/', express.static(__dirname + '/www'));
app.use('/createForm/', express.static(__dirname + '/www-form'));


// app.listen(process.env.PORT||8001);

server.listen(8001);

















