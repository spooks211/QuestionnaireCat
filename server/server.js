"use strict";

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const parser = bodyparser();

app.use('/', express.static('client'));

let motd = "Mesbah is gay";

app.post('/motd', express.json(), function(req, res){
    motd = req.body.msg;
    res.send('accepted');

});

app.get('/motd', (req, res) => {
    res.send(motd);
});

app.listen( 8080, (e) => {
    console.log(`server ${e?"failed to start":"listening"}`);
})