let express = require('express');
let weather = require('weather-js');
let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(8000, () => {console.log("Dancing with myself on port 8000")});