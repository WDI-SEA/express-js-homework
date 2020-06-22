let express = require('express');
let weather = require('weather-js');
// let ejsLayouts = require('express-ejs-layouts');
let app = express();

//For linking CSS to our viewing engine
app.use(express.static(__dirname + "/static"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get("/weather/:zipcode", (req, res) => {
    res.send(`Results for ${req.params.zipcode}`)
})




app.listen(8000, () => {console.log('Singing and dancing on port 8000!!')})