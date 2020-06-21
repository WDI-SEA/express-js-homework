let express = require("express");
let weather = require("weather-js");
let ejsLayouts = require("express-ejs-layouts");
let app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts)
app.use(express.static("static"));

app.get("/", (req, res) => {
    res.render("main");
})

app.get("/results", (req, res) => {
  //i need to google string interpolation
  weather.find({search: `${req.query.zip}`, degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
   
    console.log(JSON.stringify(result, null, 2));
    res.render("results", {values:result[0]});
  })
})

//five day forecast is an iteration
//iterate a for each with squids
//look up how to do this with ejs

// app.get("/about", (req, res) => {
//     res.render("about.ejs", {faves: ["dogs", "tacos", "dranks"]});
// })

// app.get("/blog", (req, res) => {
//     res.render("blog.ejs");
// })

app.listen(3000, () => {console.log("Singing and dancing on port 3000")})