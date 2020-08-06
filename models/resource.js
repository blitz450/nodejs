let mongoose = require('mongoose');

//article schema
let dataSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  }, timestamp:{ type: Date, default: Date.now }
});

let Data = module.exports = mongoose.model('Data', dataSchema);