const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const session = require('express-session');
let Data = require('./models/resource');
let User = require('./models/users');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT || 3000;

const passport = require('passport');
const confi = require('./confi/database');


mongoose.connect(process.env.databaseString || confi.database);
let db = mongoose.connection;

//check connection
db.once('open', function () {
  console.log('Connected to MongoDB');
});

//check for db errors
db.on('error', function (err) {
  console.log(err);
});

var upload = require('./utils/upload');
const { request } = require("http");

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
app.use('/public', express.static(path.join(__dirname, 'public')));

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//express messages middleware
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport Config
require('./confi/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// index page 

app.get('/', function (req, res) {
  Data.find({}, function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      console.log('post', posts);
      res.render('index', { user: req.session, posts: posts });
    }
  });
});

app.get('/posts/:page', function (req, res, next) {
  var perPage = 15
  var page = req.params.page || 1

  Data
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, posts) {
      Data.count().exec(function (err, count) {
        if (err) return next(err)
        res.render('posts', {
          user: req.session,
          posts: posts,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
})

// about page 
app.get('/about', function (req, res) {
  console.log('sess', req.session);
  res.render('about', { user: req.session });
});

// contact page 
app.get('/contact', function (req, res) {
  res.render('contact', { user: req.session });
});

//fullpost page
app.get('/fullpost/:id', function (req, res) {
  Data.findById(req.params.id, function (err, post) {
    res.render('fullpost', {
      post: post,
      user: req.session
    });
  });
});

//contact form data
app.post('/contact', function (req, res) {
  const output = `
    <p>You have a new Query.</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.mailing_email, // generated ethereal user
      pass: process.env.mailing_email_password  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Team-NJ2" <${process.env.mailing_email}>`, // sender address
    to: process.env.recipient_email, // list of receivers
    subject: 'Contact Details', // Subject line
    text: 'Contact Details', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.redirect('/');

    }
  });
})

// login page 
app.get('/login', function (req, res) {
  res.render('login');
});

//login form
app.post('/login', function (req, res, next) {
  var password = req.body.password;
  var email = req.body.username;
  //console.log('username', username);
  console.log('password', password);
  /*  User.find({ email: email }, function(err, user){
        if(err) throw err;
        if(user.length != 0) {
            console.log('password', user[0].password);
            if(user[0].password == password){
                console.log('user enter password', password);
                res.redirect('/upload');
            }else{
                console.log('password not matched', password);
                res.redirect('/login');
            }
       }
      }); */
  passport.authenticate('local', {
    successRedirect: '/upload',
    failureRedirect: '/login',
  })(req, res, next);
});

// signup page 
app.get('/signup', function (req, res) {
  res.render('signup');
});

// post sign up
app.post('/signup', function (req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var gender = req.body.gender;
  var city = req.body.city;
  var country = req.body.country;

  let newUser = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    gender: gender,
    city: city,
    country: country
  });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(function (err) {
        if (err) {
          console.log(err);
          return;
        } else {
          res.redirect('/login');
        }
      });
    });
  });
});

// logout
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});


// upload page 
app.get('/upload', ensureAuthenticated, function (req, res) {
  res.render('upload', { user: req.session });
});


// upload post  
app.post('/upload', upload.single('myfile'), (req, res) => {
  let data = new Data({
    title: req.body.title,
    content: req.body.content,
    name: req.file.filename
  });
  data.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('data', req.body);
      console.log('data added');
      res.redirect('/posts/1');
    }
  });
  console.log(req.body);
  console.log('Name ', req.file.filename);
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}


// catch 404 and forward to error handler
app.use(function (req, res) {
  res.render('404');
});

// server error 500
app.use(function (error, req, res) {
  res.status(500);
  res.render('error');
});

//connect to port
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});