var http = require('http');
var fs = require('fs');
var port = 8686;
var path = require('path');
var mqtt = require('mqtt');
var EventEmitter = require('events');
var sock = new EventEmitter();
var tempValue,humidityValue,sensorMeasurement;
var client = mqtt.connect('mqtt://test.mosquitto.org');

client.subscribe('sensorMeasurement');
client.on('message', function(topic, payload) {
	if (topic.toString() == "sensorMeasurement") {  
	sensorMeasurement = JSON.parse(payload);
	tempValue=sensorMeasurement.tempValue;
	humidityValue = sensorMeasurement.humidityValue;
	 console.log("Temperature: " + tempValue + " " + "Humidity: " + humidityValue);
	 	}
});


client.subscribe('weatherCondition');
client.on('message', function(topic, payload) {
	if (topic.toString() == "weatherCondition") {  
	var sensorMeasurement = JSON.parse(payload);  
	var data1=tempValue;
	var data2=humidityValue;
     sock.emit('sensorData', { value: parseFloat(sensorMeasurement.tempValue),
	  value1: parseFloat(data1),
	  value2: parseFloat(data2)});
	}
});

function handleRequest(request, response){
    var filePath = path.join(__dirname, 'dashboard.html' );
    var stat = fs.statSync(filePath);
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(filePath);
    readStream.pipe(response);	   	
}


var server = http.createServer(handleRequest);
var io = require('socket.io').listen(server);

server.listen(port, "0.0.0.0", function(){
    console.log("Server listening on: http://localhost:%s", port);
});


io.sockets.on('connection', function (socket) {
  sock = socket; 
 });


