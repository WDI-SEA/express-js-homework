let express = require('express');
let app = express();
app.set('view engine', 'ejs')
let weather = require('weather-js');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/weather', (req, res) =>  {
    let code = JSON.stringify(req.query.zip) 
    let currentWeather
    weather.find({search: code, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        console.log(JSON.stringify(result, null, 2));
        console.log(JSON.stringify(result[0].location.name));
        currentWeather = [result[0].location.name,  result[0].current.temperature, result[0].current.winddisplay, result[0].current.day]
        res.render('weather.ejs', {weathers: [currentWeather[3], currentWeather[0], `${currentWeather[1]} degrees Fahrenheit`, `With winds of ${currentWeather[2]}`]})
    }); 
   
   
})


let port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});