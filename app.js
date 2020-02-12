const express = require("express");
const weather = require("weather-js");
const layouts = require("express-ejs-layouts");
const app = express();
var bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set("view engine", "ejs");



app.get("/", (req,res) => {
	res.render("home");
});


app.get("/weather/:zipcode", (req,res) => {
	console.log(req.params);
	let zipObj = req.params;
	let zipNum = zipObj.zipcode;
	let zipString = String(zipNum);
	let resultObj = null;

	weather.find({search: zipString, degreeType: 'F'}, function(err,result){
		if(err) console.log(err);
		//console.log(result);
		resultObj = result;
		res.render("weather", {results: resultObj});
	})
	//res.render("weather", {results: resultObj});
});


app.post("/weather", (req,res) =>{
	console.log("post");
	let zip = req.body["req"];
	//console.log(zip);
	let weatherUrl = "/weather/" + zip;
	console.log(weatherUrl);
	res.redirect(weatherUrl);
	//console.log(req.body);
});

app.listen(3000, () => console.log("listening on 3000"));
