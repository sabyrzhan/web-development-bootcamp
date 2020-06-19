const express = require('express');
const https = require('https');

const app = express();

app.get('/', function(req, resp) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=ac4119e6c195057a1cd530ac6e9630d3&units=metric';
    https.get(url, function(result) {
        result.on('data', function(data) {
            var weather = JSON.parse(data);
            var temp = weather.main.temp;
            var description = weather.weather[0].description;
            resp.write('<h1>Hello</h1>');
            resp.write('<h1>Hello2</h1>');
            resp.write('<h2>Temp: ' + temp + ', description: ' + description + '</h2>');
            resp.send();
        });
    });
});

app.listen(3000, function() {
    console.log('Server started');
});