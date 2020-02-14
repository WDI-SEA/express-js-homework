const express = require("express");
const router = express.Router();



router.get("/weather", (req, res) => {
    res.render("weather", { commonweather: ["rain", "snow"]});
});

module.exports = router;


