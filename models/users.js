const mongoose = require('mongoose');

//user Schema
const UserSchema = mongoose.Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: false
  },
  city:{
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
});

const User = module.exports = mongoose.model('User', UserSchema);
