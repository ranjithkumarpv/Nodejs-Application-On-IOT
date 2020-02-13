var http = require('http');
var fs = require('fs');
var path = require('path');
var EventEmitter = require('events');
var io = require('socket.io');

var port = 8686;
var sock = new EventEmitter();

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

// This will emit/publish data periodically with "sensorData" to the client. 
setInterval(function() {
	 sock.emit('sensorData', { 
		  value: parseFloat(randomInt(1, 40)),
		  });	
	  
	}, 5000) 

function handleRequest(request, response){

	// It joins all given path segments together using the platform specific separator 
	//as a delimiter, then normalizes the resulting path.
    var filePath = path.join(__dirname, 'websocketclient.html' ); 
	
	// It returns a JSON object that describe various parameters of 
	// an object. we have been using "size" for the response.
    var stat = fs.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'text/html', 
		'Content-Length': stat.size
    });
	
	/*
	The function fs.createReadStream() allows you to open up a readable stream in a very simple manner. 
	All you have to do is pass the path of the file to start streaming in. It turns out that the response 
	(as well as the request) objects are streams. So we will use this fact to create a http server that 
	streams the files to the client. Since the code is simple enough, it is pretty easy just to read 
	through it and comment why each line is necessary.
	Source: https://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-read-stream/
	*/
	
	// This line opens the file as a readable stream
    var readStream = fs.createReadStream(filePath); 
	
	  // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
	readStream.pipe(response);	
  });
	
	
}

// This will return a new instance of a http server.
var server = http.createServer(handleRequest); 

// Create a Socket.IO instance, passing it our server
var ioObject = io.listen(server); 


// our server will be listening on port = 8686;
server.listen(port, function(){ 
	// This is call back when server is succesfully listening.
    console.log("Server listening on: http://localhost:%s", port);
});  


// This will be executed when the connection with client is established.
// Here. the client will first request to the server.
ioObject.on('connection', function (socket) {
	console.log('Connection to client established...');
	sock = socket; 
 });
 






