const express = require('express')
const ejs = require('ejs')
const weather = require('weather-js')

const app = express()
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    let zipcode = req.query
    console.log(zipcode)
    weather.find({search: zipcode.zip, degreeType: 'F'}, (err, result) => {
        if(err) console.log(err)
        console.log(JSON.stringify(result, null, 2))
        console.log(result)
        res.render('weather', {result})
    })
})

app.listen(3000)