let express = require('express')
let app = express()
let weather = require('weather-js')


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
        if(err) {
            console.log(err);
        }
    
    res.render('weather')})
    
})


app.listen(8000, () => {console.log("I hope it works")})