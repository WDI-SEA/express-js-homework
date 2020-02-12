const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const weather = require('weather-js');

app.set('view engine', 'ejs');
app.use(layouts);


// HOME - GET /
app.get('/', (req, res) => {
    // res.send('HOME');
    res.render('index');
});

// RESULTS PAGE
app.get('/weather', (req, res) => {
    // res.send('this is the results page');
    let temp;
    document.setEventListener("submit", function(e) {
        e.preventDefault();
        let zipcode = document.getElementById("zipcode").value;
        weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
            if(err) console.log(err);
           
            console.log(JSON.stringify(result, null, 2));
            temp = JSON.stringify(result, null, 2)[0].current.temperature;
          });

    });
    res.render('weather', temp);
});


// another get for the weather-js results

app.get('/weather/:zipcode', (req, res) => {
    let zipcode = req.params.zipcode;
    let temp;
    weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        temp = JSON.stringify(result, null, 2)[0].current.temperature;
        console.log(JSON.stringify(result, null, 2));
      });
    res.render('weather', temp);
});

app.listen(3000, () => console.log('🌦 Weather is Happening 🌦'));