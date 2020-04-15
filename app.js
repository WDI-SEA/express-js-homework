const express = require('express');
const layouts = require ('express-ejs-layouts');
var weather = require('weather-js');

const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('static'));



app.get('/', (req, res) => {
   res.render('home');
});


app.get('/weather', (req, res) => {
    let zip = req.query.input;
    weather.find({search: `${zip}`, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        res.render('weather', {zip, result: result[0]});
  });
});

//Zip results
app.get('/weather/:zipcode', (req, res) => {
    let zip = req.params.zipcode;
    weather.find({search: `${zip}`, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        res.render('weather', {zip, result: result[0]});
  });
});

//listen
app.listen(3000, () => console.log(`You're listening to the sweet sweet sounds of port 3000`));