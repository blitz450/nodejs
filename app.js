const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const path = require('path');
const mongoose = require("mongoose");

const PORT = 3000;

var upload = require('./utils/upload');


mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true }, (error)=> {
    if(!error){
        console.log("Success Connected!");
    } else{
        console.log("Error connecting to database!")
    }
});

//use cors
app.use(cors())

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//use morgan
app.use(morgan('dev'))

//use public folder
app.use(express.static('public'))

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('about');
});

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.render('404');
  });
  
//connect to port
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

