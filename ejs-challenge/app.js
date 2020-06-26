const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { escapeRegExp } = require("lodash");
const lodash = require('lodash/string');
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });

const todoItemSchema = {
    title: String,
    content: String
};

const Item = mongoose.model('Item', todoItemSchema);

app.get('/', function(req, res) {
  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }

    return res.render('home', {content: homeStartingContent, title: 'Home', posts: foundItems});
  });
});

app.get('/posts/:postName', function(req, res) {
  let param = lodash.lowerCase(req.params.postName);
  let postTitle = "N/A";
  let postContent = "N/A";

  Item.findOne({title: param}, function(err, found) {
    
    if (err) {
      console.log(err);
    }

    if (!err) {
      postTitle = found.title;
      postContent = found.content;
    }

    return res.render('post', {content: postContent, title: postTitle});
  });
});

app.get('/contact', function(req, res) {
  return res.render('template', {content: contactContent, title: 'Contact'});
});

app.get('/about', function(req, res) {
  return res.render('template', {content: aboutContent, title: 'About'});
});

app.get('/compose', function(req, res) {
  return res.render('compose', {title: 'Compose'});
});

app.post('/compose', function(req, res) {
  let item = new Item({title: req.body.postTitle, content: req.body.post});
  item.save(function(err) {
    if (err) {
      console.log(err);
    }

    return res.redirect('/compose');
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
