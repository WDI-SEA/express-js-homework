const express = require("express");
const layouts = require("express-ejs-layouts");
const weather = require("weather-js");

const app = express();

const getWeather = function(query) {
    return new Promise((resolve, reject) => {
        weather.find({search: query, degreeType: "F"}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.stringify(result, null, 2));
            }
        });
    });
};

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.urlencoded({ extended: true }));

app.use(express.static("static"));

// Routes
app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.post("/", (req, res) => {
    if (req.body.zipcode) {
        res.redirect(302, `/weather/${req.body.zipcode}`);
    } else {
        res.render("home.ejs");
    }
    res.end();
});

app.get("/weather/:zipcode", (req, res) => {
    getWeather(req.params.zipcode)
        .then((results) => {
            console.log("Hi", results);
            res.render("results.ejs", { weather: results });
        })
        .catch((err) => {
            res.send(404);
        });
});

app.listen(3000, () => {
    console.log("I took a trip to the port 3000!");
});