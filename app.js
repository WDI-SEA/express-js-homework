let express = require('express')
let ejsLayouts = require('express-ejs-layouts')

let app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.get('/', function(req, res) {
    res.render('index.ejs', {object: []})
 })
 
 app.get('/weather', function(req, res) {
     res.render('weather.ejs', {zipcode: []})
 })

 app.listen(8000, () => {console.log('raining cats and dogs')})