//Express
const express = require('express');
const app = express();

//Mongoose
const mongoose = require('mongoose');
const uri = "mongodb://diegobg:diego182@ds121345.mlab.com:21345/url-shortener";
mongoose.connect(uri, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var mModel = mongoose.model('Cat', { original_url: String, identifier: Number });


app.get('/new/*', (req, res) => {

    let randomNumber = Math.floor(Math.random() * 10000);
    let original = req.url.replace('/new/', '');

    var url = new mModel({ original_url: original, identifier: randomNumber });

    url.save(function (err) {
        if (err) {
            res.json({
                error: "Wrong url format, make sure you have a valid protocol and real site."
            });
        } else {
            res.json({
                original_url: original,
                short_url: "http://localhost:3000/" + randomNumber
            });
        }
    });
});

app.listen(3000);