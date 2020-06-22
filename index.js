let express = require('express');
let weather = require('weather-js');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
        if(err)  {
            console.log(err);
        }    
        res.render('results', { weather: req.query.zipcode, result: result[0] })
    })
})

app.listen(8000, () => {
    console.log("HELLO")
})
