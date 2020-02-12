// Import packages
const express = require('express');
const layouts = require('express-ejs-layouts');
const weather = require('weather-js');

// Set server stuff
const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('static'));

// Routes
app.get('/', (req, res) => {
    //res.send("HOME");
    res.render('home', { title: 'The home page!' })
})

app.get('/weather', (req, res) => {
    let zipcode = req.query.zip
    weather.find({ search: `${zipcode}`, degreeType: 'F' }, function(err, result) {
        if (err) console.log(err);

        console.log(JSON.stringify(result, null, 2));
        console.log(result);

        res.render('weather', { zipcode, result: result[0] });
    });

});

app.get('/weather/:zip', (req, res) => {
    let zipcode = req.params.zip;
    weather.find({ search: `${zipcode}`, degreeType: 'F' }, function(err, result) {
        if (err) console.log(err);

        console.log(JSON.stringify(result, null, 2));
        console.log(result);

        res.render('weather', { zipcode, result: result[0] });
    });

});


// listen
app.listen(3000, () => console.log(`🎧You're listening to the smooth sound of port 3000🎷🥁🎸`));