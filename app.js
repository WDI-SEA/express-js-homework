let express = require('express')
let weather = require('weather-js')
const bodyParser = require('body-parser')

let app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    weather.find({search: req.query.city, degreeType: 'F'}, (err, result) => {
        res.render('weather', {query: req.query.city, result: result[0]})
    })
  
})

app.listen(8000, function() {
    console.log("🌊🌊🌊")
})