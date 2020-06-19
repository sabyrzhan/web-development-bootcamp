const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({extended: true}));

app.get('/hello', function(req, res) {
    res.send('<p>Hello world</p>');
});

app.get('/hello2', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
    console.log('Started server on port=3000');
});