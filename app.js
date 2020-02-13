//set up express
const express = require('express');
const layouts = require('express-ejs-layouts');
const weather = require('weather-js');
const app = express();

//Server stuff
app.set('view engine', 'ejs');
app.set('layouts');
app.use(express.static('static'));

//routes
//home
app.get('/', (req, res) => {
    res.render('HOME');
});

//weather
app.get('/weather', (req, res) => {
    let userInput = req.query.zipcode;
    weather.find({search: `${userInput}`, degreeType: 'F'}, function (err, result) {
        if (err) console.log(err);
        res.render('weather', {userInput, result: result[0]});
    });
});

//weather/:zipcode
app.get('/weather/:zipcode', (req, res) => {
    let userInput = req.params.zipcode;
    weather.find({search: `${userInput}`, degreeType: 'F'}, function(err, result) {
        if (err) console.log(err);
        res.render('weather', {userInput, result: result[0]});
    });
});


//Listen
app.listen(3000, () => console.log ('Get your weather before you turn to leather!💼'))
