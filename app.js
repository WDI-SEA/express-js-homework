// taught in lesson with Anna 
let express = require('express');
let weather = require('weather-js');
// let ejsLayouts = require('express-ejs-layouts');
let app = express();

// what we learned in the code along with Nick 
app. set('view engine', 'ejs');
// app.use(ejsLayouts)

app.get('/', function(req, res) {
    res.send("Homepage");
})

// meant to grab the queary info and run through weather-js
app.get('/weather/', function(req, res) {
  weather.find({search: `${req.query.zipcode}`, degreeType: 'F'}, function(err, result) {
      if (err) {
          console.log(err);
      }
      // should grab weather data based on the zipcode provided 
      res.render('temperature', {query: req.query.zipcode, result: [0]})
  })
 
})

// Connection to the server - make sure it's live 
app.listen(3000, function() {
    console.log("welcome to the year 3000")
})

// example of function on HW 
// weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
//     if(err) console.log(err);
   
//     console.log(JSON.stringify(result, null, 2));
//   });