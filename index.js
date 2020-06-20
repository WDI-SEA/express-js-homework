let express = require('express');
let weather = require('weather-js');
let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/weather', (req,res) => {
    
    for (let key in req.query) {
        weather.find({search: req.query[key], degreeType: 'F'}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(result,null,2));
                //console.log(JSON.stringify(result,null,2))
            }
        })
    }
})

app.listen(8000, () => {console.log("Dancing with myself on port 8000")});