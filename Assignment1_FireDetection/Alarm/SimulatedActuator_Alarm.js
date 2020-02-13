var mqtt=require('mqtt'); 
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');
client.subscribe('notifyAlarm');  

console.log("Alarm is ready to receive event from Fire Controller"); 

client.on('message',function(topic,payload){	
	console.log("Alarm has been raised...");
}); 
