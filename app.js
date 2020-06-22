// Require needed modules
let express = require('express')
let weather = require('weather-js')
let ejslayouts = require('express-ejs-layouts')

// Declare new express app
let app = express()

//Set template language
app.set('view engine', 'ejs')
app.use(express.static('static'))
app.use(ejslayouts)


app.get('/weather', (req, res) => {
    // Run the zip code through weather-js, and expect a return
    let zipcode = req.query.zip
    weather.find({ search: zipcode, degreeType: 'F'}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.render('result', {  location: result[0].location.name,
                                zipcode: result[0].location.zipcode,
                                temp: result[0].current.temperature})
    })
})

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000)