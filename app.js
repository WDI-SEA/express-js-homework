const express = require('express');
const weather = require('weather-js');
const weatherApp = express();
weatherApp.set('viewengine', 'ejs');
weatherApp.use(express.static('static'));

weatherApp.get('/', (req, res) => {
    res.render('index.ejs');
})
//weatherApp.get('/weather/:zipcode', (req, res) => {
weatherApp.get('/weather', (req,res) => {
    //let thisZip = req.params.zipcode;
    weather.find({search: req.query.zip_code, degreeType: 'F'}, function(err, result){
        if (err) {
            console.log(err);
            res.render('weather.ejs', {message: `Error: ${err}`});
        } else {
            console.log("result", result);
            if (result[0]){
                let responseMessage = `Weather for ${result[0].location.name}: ${result[0].current.skytext}, ${result[0].current.temperature}°F`;
                res.render('weather.ejs', {message: responseMessage});
            } else {
                res.render('weather.ejs', {message: 'Could not retrieve weather for that zip code'});
            }
        }
    })
})

weatherApp.get('/weather/:randomZip', (req,res) => {
    weather.find({search: req.params.randomZip, degreeType: 'F'}, function(err, result){
        if (err) {
            console.log(err);
            res.render('weather.ejs', {message: `Error: ${err}`});
        } else {
            console.log("result", result);
            if (result[0]){
                let responseMessage = `Weather for ${result[0].location.name}: ${result[0].current.skytext}, ${result[0].current.temperature}°F`;
                res.render('weather.ejs', {message: responseMessage});
            } else {
                res.render('weather.ejs', {message: 'Could not retrieve weather for that zip code'});
            }
        }
    })
})

weatherApp.listen(8000, () => {
    console.log("Listening at 8000");
})
