const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/mytodo', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemSchema = {
    title: String
};

const listSchema = {
    list: String,
    items: [itemSchema]
};

const Item = mongoose.model('Item', itemSchema);
const List = mongoose.model('List', listSchema);

app.get('/', function(req, res) {
    let day = date.getDate();
    getList('Home', day, '/', req, res);
});

app.post('/', function(req, res) {
    postList('Home', req.body.newItem, '/', req, res);
});

app.post('/:list/delete', function(req, res) {
    List.findOne({list: req.params.list}, function(err, list) {
        if (err) {
            console.log(err);
        }

        if (list) {
            List.findOneAndUpdate({list: req.params.list}, {$pull : {items: {title: req.body.title}}}, function(err) {
                if (err) {
                    console.log(list.items);
                }
            });
        }

        if (req.params.list == 'Home') {
            return res.redirect('/');
        } else {
            return res.redirect('/' + req.params.list);
        }
    });
});

app.get('/:list', function(req, res) {
    getList(req.params.list, req.params.list, '/' + req.params.list, req, res);
});

app.post('/:list', function(req, res) {
    postList(req.params.list, req.body.newItem, '/' + req.params.list, req, res);
});

app.get('/about', function(req, res) {
    return res.render('about', {listTitle: 'About'});
})

app.listen(3000, function() {
    console.log('Started server');
});

function getList(listName, title, action, req, res) {
    List.findOne({list: listName}, function(err, foundItems) {
        if (err) {
            console.log(err);
        }

        if (!foundItems) {
            foundItems = new List({list: listName, items: []});
            foundItems.save();
            items = [];
        }

        return res.render('index', {listTitle: title, list: foundItems, action: action});
    });
}

function postList(listName, title, action, req, res) {
    List.findOne({list: listName}, function(err, list) {
        if (err) {
            console.log(err);
        }

        if (list) {
            let newItem = new Item({title: title});
            list.items.push(newItem);
            list.save();
        }

        
        return res.redirect(action);
    });
}