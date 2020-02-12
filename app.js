const express = require('express');
const layouts = require('express-ejs-layouts');

// set server 
const app = express();
app.set('view engine', 'ejs');
app.use(layouts);

// ROUTES TO
// HOME
app.use('/', require('./routes/home'));
// WEATHER
app.use('/weather', require('./routes/weather'));

// LISTEN
app.listen(3000, () => console.log(`🎧 You're listening to the sounds of port 3000 🎧`));