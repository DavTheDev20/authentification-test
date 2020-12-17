require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/btechDB', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
username: String,
password: String
});

const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => res.render('home'));

app.get('/register', (req, res) => res.render('register'));

app.get('/secret', (req, res) => res.render('secret'));

app.post('/login', function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if (user.password === req.body.password) {
            res.redirect('/secret')
        } else {
           res.redirect('/') ;
        }
    });

});


app.post('/register', function(req, res){

const username = req.body.username;
const password = req.body.password;

const newUser = new User({
    username: req.body.username,
    password: req.body.password
});

newUser.save(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Successfully saved new user to btechDB.');
        res.redirect('/');
    }
});

});


app.listen(3000, (req, res) => console.log("Server running on port 3000..."));