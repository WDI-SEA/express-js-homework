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

// function makeZip(length) {
//   let result           = '';
//   let characters       = '1234567890';
//   let charactersLength = characters.length;
//   for ( let i = 0; i < length; i++ ) {
//      result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// const randoZip = () => { 
//   makeZip(5);
// }


app.get("/results", (req, res) => {
  weather.find({search: `${req.query.zip}`, degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
   
    console.log(JSON.stringify(result, null, 2));
    res.render("results", {values:result[0]});
  })
})


app.listen(3000, () => {console.log("Ily from port 3000 ❣️")})