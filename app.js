let express = require('express')
let app = express()
let ejsLayouts = require('express-ejs-layouts')
let weather = require('weather-js')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/weather', (req, res) => {
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        if (result[0].current.temperature >= 70) {
            res.render('warm-weather.ejs', {
                location: result[0].location.name,
                currentTemp: result[0].current.temperature,
                feelsLike: result[0].current.feelslike
            })
        } else {
            res.render('cold-weather.ejs', {
                location: result[0].location.name,
                currentTemp: result[0].current.temperature,
                feelsLike: result[0].current.feelslike
            })
        }
      });
})

app.listen(3000, () => console.log('Port 3k!'))