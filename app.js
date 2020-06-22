let express = require('express')
let weather = require('weather-js')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/weather', (req, res) => {
    weather.find({search: 'San Francisco, CA', degreeType: 'F'}, (err, result) => {
        res.render('weather')
    })
  
})

app.get('/currenttemp', (req, res) => {
    weather.find({search: 'San Francisco, CA', degreeType: 'F'}, (err, result) => {
        res.render('currenttemp', {query: 'San Francisco, CA', result: result[0]})
    })
  
})

app.listen(8000, function() {
    console.log("🧐")
})