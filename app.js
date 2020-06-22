let express = require('express')

let app = express()
let ejsLayouts = require('express-ejs-layouts')

app.use(express.static(__dirname + "/static"));

let weather = require('weather-js')

let zipcodes = require('zipcodes')
var zipObject = zipcodes.random()

// let weatherLog = weather.find({ search: '98101', degreeType: 'F' }, function (err, result) {
//   if (err) { console.log(err) }
//   console.log(JSON.stringify(result, null, 2))
// })

// let currentWeather = weather.find({ search: '98101', degreeType: 'F' }, function (err, result) {
//   if (err) { console.log(err) }
//   return JSON.stringify(result, null, 2)
// })


app.set('view engine', 'ejs')

// app.use(weather)

app.get('/', (req, res) => {
  console.log('loaded /')
  res.render('index.ejs')
})

app.get('/weather', (req, res) => {
  weather.find({ search: req.query.zipCode, degreeType: 'F' }, function (err, result) {
    if (err) { console.log(err) }
    res.render('weather.ejs', ({currentWeather:result[0]}))
  })
})

app.get('/weatherRandom', (req, res) => {
  // console.log(zipObject.zip)
  weather.find({ search: zipcodes.random().zip, degreeType: 'F' }
  , function (err, result) {
    if (err) { console.log(err) }
    // console.log({currentWeather:result})
    // console.log(result[0])
    res.render('weather.ejs', ({currentWeather:result[0]}))
  })
})

// weather.find({search: '98101', degreeType: 'F'}, function(err, result) {
//   if(err) console.log(err);

//   console.log(JSON.stringify(result, null, 2));
// });


app.listen(3000, () => { console.log('punny names all day') })


console.log('loaded app.js')