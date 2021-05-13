//
// Retrieve latest weather observation from wunderground.com
//
// wunderground client for node.js
// https://www.npmjs.com/package/weather-underground-node
// npm install --save weather-underground-node


var WeatherUndergroundNode = require('weather-underground-node');
var myApiKey = 'a296b34180fe47c596b34180fe87c582';
var wunderground = new WeatherUndergroundNode(myApiKey);


wunderground.PWSCurrentConditions("IALSTO9").request(function (err, response) {
    console.log('---------------------------------------');
    if (err){ 
        console.log(err.code);
        console.log(err.msg);
    } else {
        console.log(response.observations);
        console.log(response.observations[0].metric.temp);
    }
    console.log('---------------------------------------');
});


