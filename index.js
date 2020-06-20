let express = require('express')
let weather = require('weather-js')
let ejsLayouts = require('express-ejs-layouts')
let app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)

let wheatherData;

let makeZipCode = (function () {
  let zipCode = '';
  for(let i = 0; i < 5; i++){
      zipCode += Math.floor(Math.random() * 10).toString();
  }
  return zipCode;
})()

console.log(`zipcode: ${makeZipCode}`)

weather.find({search: makeZipCode, degreeType: 'F'}, function(err, result) {
  if(err) console.log(err)
  console.log(JSON.stringify(result, null, 2))
  wheatherData = JSON.stringify(result, null, 2)
})

app.get('/', (req, res) => {
  res.render('index.ejs', { message: "Hello ejs" } )
})

app.get('/wheather/:zipcode', function(req, res) {
  res.send(req.params.zipcode.toString());
})

let port = 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})