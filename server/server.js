require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());


/****** DATABASE *****/
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected');
});

/****** DATABASE SCHEMA *****/


/****** CONFIGURATION OF API *****/
const port = (process.env.PORT || 8080);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

let data = require('./eventData');

/****** ROUTES *****/
//GET
app.get('/api/events', (req, res) => {
    data().then(json => {
        res.json(json);
    })
    .catch(() => {
        res.json({msg: 'hey you fucked up!'});
    })
})
//POST
//PUT
//DELETE

/****** Listen ******/
app.listen(port, () => console.log(`API running on port ${port}!`));