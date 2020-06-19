const express = require('express');
const weather = require('weather-js');
const weatherApp = express();
weatherApp.set('viewengine', 'ejs');

weatherApp.get('/', (req, res) => {
    res.render('index.ejs');
})
weatherApp.get('/weather/:zipcode', (req, res) => {
    let thisZip = req.params.zipcode;
    weather.find({search: thisZip, degreeType: 'F'}, function(err, result){
        if (err) {
            console.log(err);
        } else {
            console.log("result", result);
            res.render('weather.ejs', {result: result});
        }
    })
})

weatherApp.listen(8000, () => {
    console.log("Listening at 8000");
})
