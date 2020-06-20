const express = require('express');
const weather = require('weather-js');
const weatherApp = express();
weatherApp.set('viewengine', 'ejs');
weatherApp.use(express.static(__dirname + '/static'));


function retrieveWeather (zipCode, res){
// common function for retrieving weather for a zip code whether that code was user- or randomly- generated
// responds gracefully to raw errors and also to invalid zip codes, which just return empty result arrays instead of 'err' errors
    weather.find({search: zipCode, degreeType: 'F'}, function(err, result){
        let templateInfo = {message: "", background: "", imageUrl: ""};
        if (err) {
            console.log(err);
            templateInfo.message = `Error: ${err}`;
            res.render('noweather.ejs', templateInfo);
        } else {
            if (result[0]){
                templateInfo.message = `Weather for ${result[0].location.name} ${zipCode}: ${result[0].current.skytext}, ${result[0].current.temperature}°F`;
                templateInfo.imageUrl = result[0].current.imageUrl;
                if ((result[0].current.skycode > 26) && (result[0].current.skycode%2 === 1)) {
                    templateInfo.background = "night";
                } else if ((result[0].current.skycode > 26) && (result[0].current.skycode%2 === 0)){
                    templateInfo.background = "sunny";
                } else {
                     templateInfo.background = "rainy";
                }
                res.render('weather.ejs', templateInfo);
            } else {
                templateInfo.message = `Could not retrieve weather for zip code ${zipCode}.`;
                res.render('noweather.ejs', templateInfo);
            }
        }
    })
}


weatherApp.get('/', (req, res) => {
    // load index.html with pre-generated random zip code associated with Get Random Weather button
    // random zip must be generated one digit at a time
    // trying to generate random zip all at once with Math.random()*100000 results in a zip code that is missing any initial 0s
    let randomZipCode = "";
    for (let i=0; i<5; i++){
        let nextDigit = Math.floor(Math.random()*10);
        randomZipCode += nextDigit;
    }
    res.render('index.ejs', {randomZip: randomZipCode});
})
weatherApp.get('/weather', (req,res) => {
    // retrieve weather for user-entered zip code using req.query
    retrieveWeather(req.query.zip_code, res);
})
weatherApp.get('/weather/:randomZip', (req,res) => {
    // retrieve weather for random zip code using req.params
    retrieveWeather(req.params.randomZip, res);
})


weatherApp.listen(8000, () => {
    console.log("Listening at 8000");
})
