var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

setInterval(function(){
	var value={"humidityValue":randomInt(50,70)};
	client.publish('humidityMeasurement',JSON.stringify(value));	
	console.log("Publishing Humidity Measurements");
},5000);

