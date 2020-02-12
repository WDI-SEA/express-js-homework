const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('present');
});

router.post('/:zipcode', (req,res)=>{
    console.log(req.params);
    res.render('present');
});

module.exports = router;