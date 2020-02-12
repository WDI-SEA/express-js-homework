const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.get('/', (req,res) => {
    res.render('home');
});

router.post('/', (req,res)=>{
    let zip = req.body.zip.length > 0 ? req.body.zip : req.body.place;
    let unit = req.body.unit.length > 0 ? req.body.unit : 'C';
    res.redirect(`/weather/${zip}/${unit}`);
});

module.exports = router;