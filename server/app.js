require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

/***** CONFIG *****/
const app = express();
const port = (process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, '../build')));
app.use(morgan('combined'));
app.use(bodyParser.json()); 
const Schema = mongoose.Schema;

/****** DATABASE *****/
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected');
});

/**** Middleware ****/
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

/****** DATABASE SCHEMA *****/
const eventSchema = new Schema({
    id: String,
    title: String,
    description: String,
    location: [Number],
    category: String,
    start: String,
    end: String
});

const Event = mongoose.model('Event', eventSchema);


let data = require('./eventData');

/****** ROUTES *****/
//GET
app.get('/api/events', (req, res) => {
    data().then(json => {
        res.json(json);
    })
    .catch(() => {
        res.json({msg: 'Can not get the requested events'});
    })
});
app.get('/api/event/:id', (req, res) => {
    data(req.params.id).then(json => {
        res.json(json);
    })
    .catch(() => {
        res.json({msg: 'Can not get the requested events'});
    })
});

app.get('/api/attending', (req, res) => {
    Event.find({}, (err, events) => {
        if(err) return console.error(err);
        res.json(events);
    })
})

//POST
app.post('/api/attend', (req, res) => {
    let newEvent = new Event({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end
    });
    newEvent.save((err, event) => {
        if(err) return console.error(err);
        console.log(event);
    });
    Event.find({}, (err, events) => {
        if(err) return console.error(err);
        res.json(events);
    });
});

//PUT
//DELETE

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Error ****/
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

/****** Listen ******/
app.listen(port, () => console.log(`API running on port ${port}!`));