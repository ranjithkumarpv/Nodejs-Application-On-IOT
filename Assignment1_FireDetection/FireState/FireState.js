var mqtt = require('mqtt'); 
var client = mqtt.connect('mqtt://test.mosquitto.org:1883'); 
client.subscribe('roomAvgTempMeasurement'); 
var avgTemp = 0;
var smoke = "false";
client.on('message', function(topic, payload) { 
	if (topic.toString() == "roomAvgTempMeasurement") { 
		var sensorMeasurement = JSON.parse(payload);
		avgTemp = parseFloat(sensorMeasurement.tempValue);
		console.log("avgTemp Received from RoomAvgTemp is  " + avgTemp); 
	} 
}); 
client.subscribe('smokePresence'); 
client.on('message', function(topic, payload) { 
	if (topic.toString() == "smokePresence") {
		var sensorMeasurement = JSON.parse(payload);
		smoke = sensorMeasurement.smokeValue;
		console.log("Notification from Smoke Detector"); 
		if (smoke.toString() == "true" && avgTemp > 0) {
			var data = {
				"fireState" : "true"
			};
			console.log("Publishging Data to Fire Controller..."); 
			client.publish('fireMeasurement', JSON.stringify(data)); 
			smoke = "false";
		} else {
			var data = {
				"fireState" : "false"
			};
			console.log("Publishging Data to Fire Controller..."); 
			client.publish('fireMeasurement', JSON.stringify(data)); 
		}
	}
}); 