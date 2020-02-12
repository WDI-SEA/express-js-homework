const express = require('express');
const app = express();

const layouts = require('express-ejs-layouts');


// set server stuff

app.set('view engine', 'ejs');
app.use(layouts);

//routes

app.get('/', (req, res) => {
    res.send('HOME');

})

// Additional Routes
app.use('/', require('./routes/main.js'));
app.use('/weather/results.js');

//listen
app.listen(3000, () => console.log('You are listening on port 3000'));