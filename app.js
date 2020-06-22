let express = require('express');
let weather = require('weather-js');

let app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send("current weather");
})

app.listen(8000, function() {
    console.log("🧐")
})