const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('home', {data: [1,2,3,4,5]});
});

router.post('/', (req,res)=>{
    res.render('present');
});

module.exports = router;