require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

// app.get('/secret', (req, res) => res.render('secret')); 

app.post('/login', function(req, res){
    const userPassword = req.body.password;
    User.findOne({username: req.body.username}, function(err, user){

        bcrypt.compare(userPassword, user.password, function(err, result) {
            if (result === true) {
                res.render('secret');
            } else {
                res.redirect('/');
            }
        });
    });

});


app.post('/register', function(req, res){

const newUsername = req.body.username;
const newPassword = req.body.password;

if (newPassword) {
    bcrypt.hash(newPassword, saltRounds, function(err, hash) {
        const newUser = new User({
            username: newUsername,
            password: hash
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
} else {
    res.redirect('/register');
}



});


app.listen(3000, (req, res) => console.log("Server running on port 3000..."));