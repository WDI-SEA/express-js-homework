let express = require("express");
let weather = require("weather-js");
let app = express();

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('homep');
})

app.get('/weather/', (req, res) => {
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
        if (err) {
            console.log('something went wrong')
            console.log(err)
        }
        res.render('resultp', {query: req.query.zipcode, result: result[0]})
    });
})
app.listen(8080, () => console.log("Its not over 8080"));