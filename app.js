//import express & ejs layouts// 
let express = require('express')
let app = express();
let ejsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs');
app.use(ejsLayouts);

//render the viewpages//
app.get('/', (req, res) => {
  res.render('homepage.ejs')
})

app.get('/weatherResults', (req, res) => {
  res.render('weatherResults.ejs')
})

let port = 8000
app.listen(port, () => {console.log(`I figured it out!`)})