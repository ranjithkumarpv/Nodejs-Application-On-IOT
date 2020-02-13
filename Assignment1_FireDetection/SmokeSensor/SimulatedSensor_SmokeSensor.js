var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');

function randomInt (low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low);
}

setInterval(function(){
	var value={"smokeValue":randomInt(0,1)};
	console.log(value.smokeValue);
	if(value.smokeValue == 1){ 
	value={"smokeValue":"true"};
	client.publish('smokePresence',JSON.stringify(value));	
	console.log("Publishing Smoke Measurements periodically");
	}
},5000);

