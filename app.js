const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const weather = require('weather-js');
// const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({ extended: false}));
// app.use(methodOverride('_method'));


// HOME - GET /
app.get('/', (req, res) => {
    // res.send('HOME');
    res.render('index');
});

// zipcode results - GET
app.get('/weather', (req, res) => {
    let zipcode = req.body.zipcode;
    weather.find({search: zipcode, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        let temp = result[0].current.temperature;
        let desc = result[0].current.skytext;
        console.log(result[0].current.temperature);
        res.render('weather', {temp, desc, zipcode});
      });
})

// another get for the weather-js results
app.get('/weather/:zipcode', (req, res) => {
    let zipcode = req.params.zipcode;
    weather.find({search: zipcode, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        let temp = result[0].current.temperature;
        let desc = result[0].current.skytext;
        console.log(result[0].current.temperature);
        res.render('weather', {temp, desc, zipcode});
      });
});

app.listen(3000, () => console.log('🌦 Weather is Happening 🌦'));