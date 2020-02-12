// import all my stuff
const express = require('express');
const layouts = require('express-ejs-layouts');
const weather = require('weather-js');
//let input = document.querySelector('input');


// set server stuff
const app = express();
app.set('view engine', 'ejs');
app.use(layouts);

// routes
// app.get('/', (req, res) => {
    // res.send('HOME')
// })
// additional routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/weather', (req, res) => {
        let results = weather.find({search: req.query.bobby, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
       
        console.log(JSON.stringify(result, null, 2));
        console.log(result);
        
        //return result;
        
        res.render('weather', { results: result[0]})
      });
})
app.get('/weather/:zip', (req, res) => {
    let bub = req.params.zip;
    weather.find({search: bub, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        res.render('weather', {results: result[0]})
    })
})
// let zip = weather.find({search: '04105', degreeType: 'F'}, function(err, result) {
    // if(err) console.log(err);
   
    // console.log(JSON.stringify(result, null, 2));
//   });
//app.get()
//app.use('/faves', require('./routes/faves'));
// listen
app.listen(3000, () => console.log(`🧙🏿You're listening to the smooth sounds of port 3000🧝🏻‍♀️`));