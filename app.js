const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;


mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true }, (error)=> {
    if(!error){
        console.log("Success Connected!");
    } else{
        console.log("Error connecting to database!")
    }
});

app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
