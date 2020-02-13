var mqtt = require('mqtt'); // no count for NodeRED
var client = mqtt.connect('mqtt://test.mosquitto.org:1883'); // no count for NodeRED
var NUM_SAMPLE_FOR_AVG = 5;
var numSample = 0;
var tempCelcius = 0;
var currentAvg = 0;
client.subscribe('tempMeasurement'); 
client.on('message', function(topic, payload) { 
	if (topic.toString() == "tempMeasurement") { 
		sensorMeasurement = JSON.parse(payload);
		if (numSample <= NUM_SAMPLE_FOR_AVG) {
			numSample = numSample + 1;
			if (sensorMeasurement.unitOfMeasurement == 'F') {
				tempCelcius = ((sensorMeasurement.tempValue - 32) * (5 / 9));
			} else {
				tempCelcius = sensorMeasurement.tempValue;
			}
			currentAvg = parseFloat(currentAvg) + parseFloat(tempCelcius);
			if (numSample == NUM_SAMPLE_FOR_AVG) {
				currentAvg = currentAvg / NUM_SAMPLE_FOR_AVG;
				var avgTemp = {
					"tempValue" : parseFloat(currentAvg),
					"unitOfMeasurement" : sensorMeasurement.unitOfMeasurement
				};
				client.publish('roomAvgTempMeasurement', JSON.stringify(avgTemp)); 
				console.log("Publishing Data roomAvgTempMeasurement..."); 
				numSample = 0;
				currentAvg = 0;
			}
		}
	} 
}); 