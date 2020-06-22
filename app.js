//import express & ejs layouts// 
let express = require('express')
let app = express();
let ejsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs');
app.use(ejsLayouts);

//render the viewpages//
app.get('/', (req, res) => {
  res.render('homepage.ejs')
})

app.get('/weatherResults', (req, res) => {
  res.render('weatherResults.ejs')
})

let port = 8000
app.listen(port, () => {console.log(`I figured it out!`)})

let weather = require('weather-js');

// weather.find({search: '', degreeType: 'F'}, function(err, result) {
//   if(err) console.log(err);
  
//   console.log(JSON.stringify(result, null, 2));
// });


app.get('/zipcode/', (req, res) => {
    console.log(req.query);
  })

// weather.find({search: zipcode, degreeType: 'F'}, function(err, result) {
//   if(err) {
//   console.log(err) 
//   } else {

//   }
// }})


