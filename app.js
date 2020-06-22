console.log("I am start to write an app!")
 
const express = require('express');
const weather = require('weather-js');
const app = express();

app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));

// Routes ----------------------


app.get('/', (req, res) => {
    //res.send('HOME');
    res.render('home.ejs');
})


app.get('/weather/', (req, res) => {
  console.log(req.query)
    // Literally just took it from the docs
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
      if(err) {
        console.log('💩 You have an Error !')
        console.log(err);
      }
      // res.send(result)
      res.render('results.ejs', { query: req.query.zipcode, result: result[0] })
    });
    //res.send(`Results for ${req.params.query}`);
  

  })



app.listen(3000, () => console.log(" You're listening to the smooth sounds of port 3000 "));