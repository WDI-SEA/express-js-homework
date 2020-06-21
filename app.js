var weather = require('weather-js');
var express = require('express');
const { query } = require('express');
var app = express();

app.set('view engine', 'ejs')

// set a home page/directory/filepath
app.get('/', function (req, res) {
    res.render('main.ejs')
})

// set the weather page
app.get('/weather/', function (req, res) {
    weather.find({ search: req.query.zipcode, degreeType: 'F' }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.render('weather', { query: req.query.zipcode, result: result[0] })
    })
})


app.listen(8000, () => console.log('Its a wonderful day!') )