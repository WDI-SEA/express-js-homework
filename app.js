const express = require("express");
const weather = require("weather-js");
const path = require("path");
const bodyParser = require("body-parser");
const port = 8000;

const app = express();

/* ----------- MIDDLEWARE ------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views" + "/index.html"));
});

app.post("/weather", (req, res) => {
  weather.find({ search: req.body.zip, degreeType: "F" }, function (
    err,
    result
  ) {
    if (err) console.log(err);
    res.send(
      `${result[0].location.name}<br>
      ${result[0].current.day}<br>
      ${result[0].current.temperature} F, ${result[0].current.skytext}<br>
      Low: ${result[0].forecast[0].low} High: ${result[0].forecast[0].high}<br>
      <form action="/" method="GET">
      <button type="submit">Back to home</button>
    </form>`
    );
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
