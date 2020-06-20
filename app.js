const express = require('express');
const weather = require('weather-js');
const weatherApp = express();
weatherApp.set('viewengine', 'ejs');


function retrieveWeather (zipCode, res){
    weather.find({search: zipCode, degreeType: 'F'}, function(err, result){
        if (err) {
            console.log(err);
            res.render('weather.ejs', {message: `Error: ${err}`});
        } else {
            console.log("result", result);
            if (result[0]){
                console.log("forecast", result[0].forecast);
                let responseMessage = `Weather for ${result[0].location.name} ${zipCode}: ${result[0].current.skytext}, ${result[0].current.temperature}°F`;
                res.render('weather.ejs', {message: responseMessage});
            } else {
                res.render('weather.ejs', {message: `Could not retrieve weather for zip code ${zipCode}.`});
            }
        }
    })
}


weatherApp.get('/', (req, res) => {
    res.render('index.ejs', {randomZip: Math.floor(Math.random()*100000)});
})
weatherApp.get('/weather', (req,res) => {
    //let thisZip = req.params.zipcode;
    retrieveWeather(req.query.zip_code, res);
})
weatherApp.get('/weather/:randomZip', (req,res) => {
    retrieveWeather(req.params.randomZip, res);
})


weatherApp.listen(8000, () => {
    console.log("Listening at 8000");
})
