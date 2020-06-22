var express = require('express');
var weather = require('weather-js');
let app = express();
// var expressLayouts = require('express-ejs-layouts');


//For linking CSS to our viewing engine
app.use(express.static(__dirname + "/static"));

app.set('view engine', 'ejs');

// app.use(expressLayouts);
//this applies the header to every page through the layouts.ejs file


app.get('/', (req, res) => {
    res.render('home')
})

app.get("/results", (req, res) => {
    //  the get method on the form already creates a query so we don't need to put that on the end of the /result
    // the name of the form text box would go on the end of the query because it tells it that 
    weather.find({search: req.query.zipcode, degreeType: 'F'}, function(err, result) {
        if(err){
            console.log('You pooped the bed :/')
            console.log(err);
        }
        // console.log(JSON.stringify(result, null, 2));
         // res.send(`Results for ${req.params.zipcode}`);
        res.render('results', {weather: result[0]})
      });

})




app.listen(8000, () => {console.log('Singing and dancing on port 8000!!')})