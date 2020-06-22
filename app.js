let express = require('express');
let weather = require('weather-js');

let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//homepage: index.ejs
app.get('/', (req, res) => {
    res.render('index');
});
//form action page (GET method attached to req.query)
app.get('/weather', (req, res) => {
    weather.find(
        {
            search: req.query.zip,
            degreeType: 'F'
        },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result)

                res.render(
                    'weather',
                    {
                        locationName: result[0].location.name,
                        locationZip: result[0].location.zipcode,
                        date: result[0].current.date,
                        day: result[0].current.day,
                        currentImg: result[0].current.imageUrl,
                        skyText: result[0].current.skytext,
                        temperature: result[0].current.temperature,
                        humidity: result[0].current.humidity,
                        temp: parseInt(result[0].current.temperature)
                    }
                )
            }
        }
    )
});

app.listen(8000, () => {
    console.log(`let's build this thing 🚀`);
});