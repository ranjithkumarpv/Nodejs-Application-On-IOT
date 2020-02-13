var http = require('http');
var port = 8686; var i=0;

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

function send404Response(response){
	response.writeHead(404,{"Content-Type": "text/plain" });
	response.write("Error 404: Page not found");
	response.end();
}

http.createServer(function(req, res) {
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);//since client and server are on the same machine we need to mention this code
		res.end();
		return;
	}
	
	console.log('New incoming client request for ' + req.url);
	res.writeHeader(200, { 'Content-Type' : 'application/json'});
	
   switch (req.url) {
   case '/temperature':		
		res.write('{"value" :' + randomInt(1, 40) + '}');
		res.end();	
		break;
	default:
	      send404Response(res);		
	}
}).listen(port);
console.log('Server listening on http://localhost:' + port);
