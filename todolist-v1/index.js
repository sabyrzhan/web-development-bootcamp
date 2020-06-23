const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var newItems = [];

app.get('/', function(req, res) {
    var today = new Date();
    var currentDay = today.getDay();

    var dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = new Date().toLocaleDateString("en-KZ", dateOptions);

    res.render('index', {kindOfDay: day, newItems: newItems});
});

app.post('/', function(req, res) {
    var newItem = req.body.newItem;
    newItems.push(newItem);
    return res.redirect('/');
});

app.listen(3000, function() {
    console.log('Started server');
});