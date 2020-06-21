//connect to express 
let express = require('express');
let app = express();
let layouts = require('express-ejs-layouts');

//set views to EJS
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({extended: false}))


//connect to weather-js npm
let weather = require('weather-js');

//homepage route
app.get('/', function(req, res) {
    res.render('index');
})
//weather data route - a GET route that returns weather data from zip entered
app.get('/weather', function(req, res) {
    console.log(req.query.zipcode);
    let zipcode = req.query.zipcode;
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
        if (err) console.log(err);
        console.log(zipcode);
        console.log(JSON.stringify(result, null, 2));

        res.render('weather', {zipcode, result: result[0]});
    });
    
})

//listen 
app.listen(3000);
