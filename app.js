const express = require("express");
const app = express();
const path = require('path');
const multer  = require('multer');
const mongoose = require("mongoose");
const PORT = 3000;


// mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true }, (error)=> {
    if(!error){
        console.log("Success Connected!");
    } else{
        console.log("Error connecting to database!")
    }
});

//use public folder
app.use(express.static('public'))

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set storage 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage })

// index page 
app.get('/', function(req, res) {
    res.render('index');
});

//connect to port
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
