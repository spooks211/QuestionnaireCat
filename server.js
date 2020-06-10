"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/assets', express.static(`${__dirname}`));

app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/makeQuestionnaire',(req, res)=>{
    res.sendFile(`${__dirname}/makeQuestionnaire.html`);
});

app.post('/api/questionnaires', (req, res)=>{
    console.log(req.body) ;
}); 

app.listen(8080);