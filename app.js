const express = require('express');
const weather = require('weather-js');
const weatherApp = express();
weatherApp.set('viewengine', 'ejs');
weatherApp.use(express.static(__dirname + '/static'));


function retrieveWeather (zipCode, res){
    weather.find({search: zipCode, degreeType: 'F'}, function(err, result){
        if (err) {
            console.log(err);
            res.render('weather.ejs', {message: `Error: ${err}`, viewBackground: viewBackground});
        } else {
            console.log("result", result);
            if (result[0]){
                console.log("forecast", result[0].forecast);
                let responseMessage = `Weather for ${result[0].location.name} ${zipCode}: ${result[0].current.skytext}, ${result[0].current.temperature}°F`;
                let viewBackground = "";
                if ((result[0].current.skycode > 26) && (result[0].current.skycode%2 === 1)) {
                    viewBackground = "night";
                } else if ((result[0].current.skycode > 26) && (result[0].current.skycode%2 === 0)){
                    viewBackground = "sunny";
                } else {
                     viewBackground = "rainy";
                }
                res.render('weather.ejs', {message: responseMessage, resultObject: result[0], viewBackground: viewBackground});
            } else {
                res.render('weather.ejs', {message: `Could not retrieve weather for zip code ${zipCode}.`, viewBackground: viewBackground});
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
