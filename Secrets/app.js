//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrdCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({googleId: profile.id}, function(err, user) {
            return cb(err, user);
        });
    }));

app.use(session({
    secret: process.env.MONGO_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://root:root@localhost:27017/userDB?authSource=admin',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrdCreate);

const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/auth/google', passport.authenticate('google', {'scope': ['profile']}));

app.get('/auth/google/secrets', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
    return res.redirect('/secrets');
});

app.route('/login')
    .get(function(req, res) {
        res.render('login');
    })
    .post(function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        let user = new User({username: username, password: password});
        req.login(user, function(err) {
            if (err) {
                console.log(err);
                return res.redirect('/login');
            }

            passport.authenticate('local', {failureRedirect: '/login'}) (req, res, function() {
                return res.redirect('/secrets');
            });
        });
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.route('/register')
    .get(function(req, res) {
        res.render('register');
    })
    .post(function(req, res) {
        User.register({username: req.body.username}, req.body.password, function(err, user) {
            if (err) {
                console.log(err);
                return res.redirect('/register');
            }

            passport.authenticate('local')(req, res, function() {
                return res.redirect('/secrets');
            });
        });
    });

app.get('/secrets', function(req, res) {
    User.find().ne('secret', null).exec(function(err, users) {
        return res.render('secrets', {users: users});
    });
});

app.route('/submit').
    get(function(req, res) {
        if (!req.isAuthenticated()) {
            return res.render('login');
        }
        return res.render('submit');
    })
    .post(function(req, res) {
        const submittedSecret = req.body.secret;
        User.findById(req.user.id, function(err, user) {
            if (err) {
                console.log(err);
                return res.redirect('/submit');
            }

            user.secret = submittedSecret;
            user.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.redirect('/submit');
                }

                return res.redirect('/secrets');
            });

        });
    });


app.listen(3000, function() {
    console.log('Server started');
})