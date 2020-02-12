//import my dependencies
const express = require('express');
const layouts = require ('express-ejs-layouts');
var weather = require('weather-js');

//set server stuff
const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('static'));


//routes

//HOME
app.get('/', (req, res) => {
    // res.send('HOME');
   res.render('home');
});

//WEATHER
// app.get('/weather', function(req, res) {
//     // res.send(req.query.zipcode);
//     // res.send('WEATHER');
//     res.send(req.query.input);
// });

// app.use('/weather', require('./routes/weather'));
// let zip = res.body.zip


app.get('/weather', (req, res) => {
    let zip = req.query.input;
    weather.find({search: `${zip}`, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
    // console.log(JSON.stringify(result, null, 2));
        res.render('weather', {zip, result: result[0]});
  });
});

//ZIP(RESULTS)
app.get('/weather/:zipcode', (req, res) => {
    let zip = req.params.zipcode;
    weather.find({search: `${zip}`, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
    // console.log(JSON.stringify(result, null, 2));
        res.render('weather', {zip, result: result[0]});
  });
});

//listen
app.listen(3000, () => console.log(`🎧You're listening to the sweet sweet sounds of port 3000🎧`));