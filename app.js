// import
const express = require('express');
const layouts = require('express-ejs-layouts');
const weather = require('weather-js');

// set-up
const app = express(); 
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('static'));


// routes
// homepage that includes some instructions for the user
app.get('/', (req, res) => {
    res.render('weather');
});


// results page that displays the weather in the location given by the user.
app.get('/results', (req, res) => {
    console.log('should be showing results page');
    weather.find({search: `${req.query.zipcode}`, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        console.log(result);
        res.render('results', {data: result[0]});
    });
});


// listen
app.listen(3000, () => console.log(`😜🤪 You're listening to the sm000th sounds of port 3000`));