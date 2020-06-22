let express = require('express');
let weather = require('weather-js');
let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.use(express.static(__dirname + '/public'));

app.get('/weather', (req,res) => {
    //res.render('weather.ejs', {req: req.query, res: res.query});
    for (let key in req.query) {
        weather.find({search: req.query[key], degreeType: 'F'}, function(err, result) {

            if (err) {
                console.log(err);
            } else {
                //res.send(JSON.stringify(result,null,2));
                let weatherConditions = JSON.stringify(result,null, 2)
                JSON.parse(weatherConditions, (key, value) => {
                    if (key === "name") {
                        res.write("Location: " + value + "\n");
                    } else if (key === 'zipcode') {
                        res.write("Zipcode: " + value + "\n");
                    } else if (key === 'temperature') {
                        res.write(value + " degrees" + "\n");
                    } else if (key === 'skytext') {
                        res.write(value + " outside" + "\n");
                    }
                })  
            } res.send();
        }); 
        
    } 
})

app.listen(8000, () => {console.log("Dancing with myself on port 8000")});


