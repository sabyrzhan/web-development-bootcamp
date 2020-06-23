const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js');

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let newItems = [];
let workItems = [];

app.get('/', function(req, res) {
    let day = date.getDate();
    res.render('index', {listTitle: day, newItems: newItems, action: '/'});
});

app.post('/', function(req, res) {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    return res.redirect('/');
});

app.get('/work', function(req, res) {
    res.render('index', {listTitle: "Work list", newItems: workItems, action: '/work'});
});

app.post('/work', function(req, res) {
    let newItem = req.body.newItem;
    workItems.push(newItem);
    return res.redirect('/work');
});

app.get('/about', function(req, res) {
    return res.render('about', {listTitle: 'About'});
})

app.listen(3000, function() {
    console.log('Started server');
});