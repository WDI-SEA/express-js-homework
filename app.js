let express = require('express');
let app = express();
let weather = require('weather-js');
let ejslayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
// app.use(ejslayouts);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/weather/', (req, res) => {
    weather.find({search: req.query.zipcode, degreeType: 'F', timezone: '-7'}, function(err, result) {
        if(err) {
            console.log(err);
        }

        // I got stuck and had to reference Sarah's solution.  I don't fully understand what this is doing
        res.render('results', { query: req.query.zipcode, result: result[0]})
    })
});


app.listen(8000, () => {console.log("I hope it works")});