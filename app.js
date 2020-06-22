//import express & ejs layouts// 
let express = require('express')
let app = express();
app.use('/static', express.static('static'));
app.set('views', __dirname + '/views')
let ejsLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs');
app.use(ejsLayouts);


//render the viewpages//
app.get('/', (req, res) => {
  res.render('homepage.ejs')
})

let weather = require('weather-js');

app.get('/weather', (req, res) => {
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
      if(err) console.log(err);
      
      console.log(JSON.stringify(result, null, 2))
      res.render('weather.ejs', {query: req.query.zipcode, result: result[0]})
      });
      
  })

  let port = 8000
  app.listen(port, () => {console.log(`I figured it out!`)})


