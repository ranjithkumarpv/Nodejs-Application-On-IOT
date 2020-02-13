var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

setInterval(function(){
	 var value={"tempValue":randomInt(50,70),"unitOfMeasurement":"C","humidityValue": randomInt(0,40)};
        console.log('Temperature: ' + value.tempValue + 'C, ' + 
            'Humidity: ' + value.humidityValue + '%'); 
	 		client.publish('sensorMeasurement',JSON.stringify(value));  

	console.log("Publishing Temperature and Humidity Measurements...");
},5000);

