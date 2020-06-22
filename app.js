let express = require('express');
let app = express();
let weather = require('weather-js');
let ejsLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/weather", (req, res) => {
    weather.find({search: req.query.zipcode ,degreeType: "F"}, (err, result) => {
        if(err) {
            res.render("weather.ejs", {message : `ERROR: ${err}`});
        } else {
            if(result[0]){
                let output = `Weather for ${result[0].location.name}: ${result[0].current.skytext}, ${result[0].current.temperature}°F`;

                res.render("weather.ejs",{result: result[0], message: output});
            } else {
                res.render("weather.ejs", {message: "Invalid Zip code"});
            }
        }
    })
})


app.listen(8000);