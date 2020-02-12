const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const weather = require('weather-js');

app.set('view engine', 'ejs');
app.use(layouts);


//routes
//home
app.get('/', (req, res) => {
    res.render('home');
})


//weather
app.get('/weather', (req, res) => {
    // console.log(req.query.zipcode)
    let userInput = req.query.zipcode;
    weather.find({search: `${userInput}`, degreeType: 'F'}, function(err, result) {
        if(err) {console.log(err)};
        // return JSON.stringify(results)
        console.log(result[0])
        res.render('weather', {userInput, results: result[0]});
    
    });
})

//weather/:zipcode
app.get('/weather/:zipcode', (req, res) => {
    let userInput = req.params.zipcode;
    weather.find({search: `${userInput}`, degreeType: 'F'}, function(err, result) {
        if(err) {console.log(err)};
        console.log(result[0])
        res.render('weather', {userInput, results: result[0]})
    });
})



app.listen(3000, () => console.log("You're live!"));
