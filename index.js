//make express node package availible for use
let express = require('express')
//make weatherr-js package availible
let weather = require('weather-js')
//make ejs layouts availible
let ejsLayouts = require('express-ejs-layouts')
//create express app
let app = express()
//set express app to the ejs view engine
app.set('view engine', 'ejs')
//config express app to use an ejs layout template
app.use(ejsLayouts)
//config express app to capture urlencoded data and return as string
app.use(express.urlencoded({extended: false}));
//configure app to listen on local port
let port = 8000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

//raondom zipcode
let makeZipCode = (function () {
  let zipCode = '';
  for(let i = 0; i < 5; i++){
      zipCode += Math.floor(Math.random() * 10).toString();
  }
  console.log(`zipcode: ${zipCode}`)
  return zipCode;
})()

//data variables
let weatherrData
let locationData
let currentData
let forecastData
//find weatherr data from weatherr-js
function findWheather(){
  //find weatherr data from weatherr-js
  weather.find({search: makeZipCode, degreeType: 'F'}, function(err, result) {
  if(err) { console.log(err) } 
    if(result.length === 0) {
      console.log('returning early, bad zipcode')
      badZipcodeCallback();
      return
    } else {
      //all the data
      weatherrData = result
      //console.log(wheatherData)
      //data at location
      locationData = result[0]['location']
      //console.log(locationData)
      //data at current
      currentData = result[0]['current']
      //data at forecast
      forecastData = result[0]['forecast']
      //console.log(forecastData)
      //respond with ejs html and data
      app.get('/', (req, res) => {
        res.render('index.ejs', { message: "Hi I'm the server, and this is random weatherr location I found for you. Enjoy!", 
                                  locationData: locationData, 
                                  currentData: currentData, 
                                  forecastData: forecastData } )
      })
    }
  })
}
findWheather();

//retry finding weatherr with new zip code
function badZipcodeCallback() {
  //make new zipcode
  makeZipCode = (function () {
    let zipCode = '';
    for(let i = 0; i < 5; i++){
        zipCode += Math.floor(Math.random() * 10).toString()
    }
    console.log(`new zipcode: ${zipCode}`)
    return zipCode;
  })()
  //try to find weatherr again
  findWheather();
}

//get index.ejs so we can view at /
// app.get('/', (req, res) => {
//   res.render('index.ejs', { message: "Hi I'm the server, and this is random weatherr location I found for you", 
//                            displayData: 'null' } )
// })


//http://localhost:8000/wheather?zipCode=5467

//get zipcode from /wheather
app.get('/weather', function(req, res) {
  let zipCode = req.query.zipCode;
  //let zipCode = 'hello'
  console.log(req.query)
  res.render('results', { zipCode: zipCode })
})

// app.get('/:input', function(req, res){
//   res.send(`our parameter is ${req.params.input}.`)
//   })
