let express = require('express');
let app = express();

app.get('/', (req, res) => {
    res.send("hey");
})

app.get('/weather/:zipcode', (req, res) => {
    res.send(`Resuslts ${req.params.zipcode}`);
})

app.listen(5000, () => {
    console.log("hey")
});