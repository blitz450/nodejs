const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log("Success Connected!");
    } else {
        console.log("Error connecting to database!")
    }
});

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});