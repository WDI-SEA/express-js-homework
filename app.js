let express = require('express');
let app = express();
let weather = require('weather-js');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('home.ejs');
  })

app.get('/results', (req, res) => {
  weather.find({search: req.query.zipcode, degreeType: 'F'}, function(error,result) {
    res.render('results', {weather: result[0]});
  });
})



  app.listen(3000, () => console.log("Singing and dancing on port 3000 ")); 