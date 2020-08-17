let mongoose = require('mongoose');

//article schema
let dataSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  }, timestamp:{ type: Date, default: Date.now }
});

let Data = module.exports = mongoose.model('Data', dataSchema);