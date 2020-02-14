// IMPORT ALL MY STUFF
const express = require("express");
const layouts = require("express-ejs-layouts");
var weather = require('weather-js');

// SET SERVER STUFF
const app = express();
app.set("view engine", "ejs");
app.use(layouts);

// ROUTES
app.get("/", (req, res) => {
    res.render("home");
});
app.get("/weather", (req, res) => {
    // let zipcode = req.params.input;
    // weather.find({search: `${zipcode}`, degreeType: 'F'}, function(err, result) {
    //     if(err) console.log(err);
    res.render("weather");
});

// ADDITIONAL ROUTES
// app.use("/weather", require("./routes/weather"));

// LISTEN
app.listen(3000, () => console.log(`👻You are now listening to the sssmoooothhh sounds of Captain Space Ghost👻`));