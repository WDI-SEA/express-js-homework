const express = require('express');
const weather = require('weather-js');

const router = express.Router();
let wdata;
let unit = 'C';
let query = '98101';

router.get('/', (req,res) => {
    res.render('present');
});

router.get('/:zipcode', (req,res)=>{
    if (req.params.zipcode.length > 0) query = req.params.zipcode;
    weather.find({search: `${query}`, degreeType: unit}, function(err, result) {
        if(err) console.log(err);
        wdata = result[0];
        res.render('present', {data:wdata});
      });

    
});

router.get('/:zipcode/:unit', (req,res)=>{
    if (req.params.zipcode.length > 0) query = req.params.zipcode;
    if (req.params.unit.toUpperCase() == 'F') unit = 'F';
    weather.find({search: `${query}`, degreeType: unit}, function(err, result) {
        if(err) console.log(err);
        wdata = result[0];
        res.render('present', {data:wdata});
    });
});

module.exports = router;