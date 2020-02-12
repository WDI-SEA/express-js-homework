//import my dependencies
const express = require('express');
const layouts = require ('express-ejs-layouts');
const weather = require('weather-js');

//set server stuff
const app = express();

//routes

//home
app.get('/', (req, res) => {
    res.send('HOME');
});

//weather
app.get('/weather', function(req, res) {
    res.send('WEATHER');
});

//zip
app.get('/weather/:zip', function(req, res) {
    let zip = req.params.zip;
    res.send(`Here is the weather for ${zip}`);
});

//listen
app.listen(3000, () => console.log(`🎧You're listening to the sweet sweet sounds of port 3000🎧`));