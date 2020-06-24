let express = require('express');
let app = express();
let weather = require('weather-js');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.set('view engine', 'ejs');

//Create 
app.get('/', (req, res) => {
  res.render('home.ejs');
  })

app.get('/weather/:zipcode', (req, res) => {
  res.send(`Results for $(req.params.zipcode)`)
})



  app.listen(3000, () => console.log("Singing and dancing on port 3000 ")); 