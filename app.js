let express = require('express');
let app = express();
let weather = require('weather-js');

app.set('view engine', 'ejs');

//homepage: index.ejs
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/weather', (req, res) => {
    res.send('YOU LINKED THE WEATHER RESULTS! Params: ' + req.query.weather)
});


app.listen(8000, () => {
    console.log(`let's build this thing 🚀`);
});