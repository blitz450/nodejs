const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
let Data = require('./models/resource');

const PORT = 3000;

var upload = require('./utils/upload');

mongoose.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true
}, (error) => {
    if (!error) {
        console.log("Success Connected!");
    } else {
        console.log("Error connecting to database!")
    }
});

//use cors
app.use(cors())

//use body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//use morgan
app.use(morgan('dev'))

//use public folder
app.use(express.static('public'))

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// index page 
app.get('/', function (req, res) {
    res.render('index');
});

// about page 
app.get('/about', function (req, res) {
    res.render('about');
});

// contact page 
app.get('/contact', function (req, res) {
    res.render('contact');
});

// login page 
app.get('/login', function (req, res) {
    res.render('login');
});

//login form
app.post('/login', function (req, res) {
    var password= req.body.password;
    var username= req.body.username;
    console.log('username', username);
    console.log('password', password);
    res.send('You are logged in');
});

// signup page 
app.get('/signup', function (req, res) {
    res.render('signup');
});

// post sign up
app.post('/signup', function (req, res) {
    var firstname= req.body.firstname;
    var lastname= req.body.lastname;
    var email= req.body.email;
    var password= req.body.password;
    var gender= req.body.gender;
    var city= req.body.city;
    var country= req.body.country;
    console.log('firstname', firstname);
    console.log('lastname', lastname);
    console.log('gender', gender);
    console.log('city', city);
    console.log('country', country);
    console.log('email', email);
    console.log('password', password);
    res.send('sign up successfull');
});

// upload page 
app.get('/upload', function (req, res) {
    res.render('upload');
});


// upload post  
app.post('/upload', upload.single('mypic'), (req, res) => {
    let data = new Data();
    data.name = req.file.filename;
    data.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
            console.log('data added');
            res.send('Uploaded');
        }    
    });
console.log(req.body);
console.log('Name ', req.file.filename);});

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.render('404');
});

// server error 500
app.use(function(error, req, res) {
    res.status(500);
  res.render('error');
  });

//connect to port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});