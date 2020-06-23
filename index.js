let Express = require("express")
let weather = require("weather-js")

// initialize Express app
let app = Express()

// set ejs view engine
app.set('view engine', 'ejs')

// create random zipcode
// get random numbers 0-9 for x5 digits
function createZipcode() {
    let zipcode = "";
    for (let x = 0; x < 5; x++) {
      let digit = Math.floor(Math.random() * 10);
      zipcode += digit;
    }
    return zipcode
}

// declare random zipcode route - run post route on button click
app.get('/', function(req, res) {
    res.render('pages/weatherButton', { zipcode: createZipcode() })
})

app.post('/weather/:zipcode', function(req, res) {
    weather.find({search: req.params.zipcode, degreeType: 'F'}, function(err, result) {
        if (err) {
            res.send("error error error")
        } else {
            let resultWeather = JSON.stringify(result)
            if (resultWeather === []) {
                res.send("No such zipcode - try again!")
            } else {
                res.send(resultWeather)
            }
        }
    })
})


app.listen(3000)