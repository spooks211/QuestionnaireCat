"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');


//makes a path for the questionnaire folder, where all the questionnaire files
//are stored
const directoryPath = path.join(__dirname, 'questionnaires');

const answerPath = path.join(__dirname, "answers");

app.use(bodyParser.json());
//this holds the selected questionnaire JSON, it is selected in viewQuestionnaires.html
let selectedQuiz = {};

app.use('/assets', express.static(`${__dirname}`));

//these 5 app.gets establish routes for the server for the different html files
app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/viewQuestionnaires',(req, res)=>{
    res.sendFile(`${__dirname}/viewQuestionnaires.html`);
});

app.get('/makeQuestionnaire',(req, res)=>{
    res.sendFile(`${__dirname}/makeQuestionnaire.html`);
});

app.get('/answerQuestionnaire', (req, res)=>{
    res.sendFile(`${__dirname}/answerQuestionnaire.html`)
});

app.get('/downloadAnswers', (req, res)=>{
    res.sendFile(`${__dirname}/downloadAnswers.html`);
})

//makes a json file for an entire questionnaire that was made in makeQuestionnaire.html
app.post('/api/questionnaires', (req, res)=>{
    const questionnaireTitle = req.body[0].title;
    const jsonQuestionnaire = JSON.stringify(req.body);
    fs.writeFile('./questionnaires/'+questionnaireTitle+'.json', jsonQuestionnaire, err=>{
        if (err){
            console.log("Error writing to file ", err);
        }else{
            console.log("Suceesfully written to file.");
        }
    });
});

app.get('/api/downloadAnswers/', (req, res)=>{
    const answersFiles = fs.readdir(answerPath, function(err, files){
        if (err){
            return console.log("Unable to read directory. " + err);
        }
        res.json(files);
    });
});

app.get('/api/downloadAnswer/:id', (req,res)=>{
    const f = req.params.id;
    
});

//reads the directory of questionnaires and sends the list to answerQuestionnaire.js
app.get('/api/viewQuestionnaires', (req, res)=>{
    const directory = fs.readdir(directoryPath, function(err, files) {
        if (err){
            return console.log("Unable to read directory." + err);
        }
        res.json(files);
    });
});
//saves the answers sent by the client to answers
app.post('/api/answerQuestionnaire', (req,res)=>{
    const answerTitle = req.body.questionnaireTitle;
    const jsonAnswers = JSON.stringify(req.body);

    fs.writeFile('./answers/' +answerTitle+ 'Answers.json' , jsonAnswers, err =>{
        if(err){
            console.log("Error writing to file", err);
        }else{
            console.log("Sucessfully written to file.");
        }
    });
});

//this sends the object that contains the questionnaire that will be rendered on
//answerQuestionnaire.html
app.get('/api/answerQuestionnaire', (req,res)=>{
    res.json(selectedQuiz);
})

//receives a filename from viewQuestionnaire and reads and parses that file into the
//selectedQuiz object for later use
app.post('/api/viewQuestionnaires', (req , res) =>{
    let fileName = req.body.class;

    fs.readFile('./questionnaires/'+fileName, function read(err, data){
        if (err){
            console.log("Failed to read file " + err);
        }
        const content = data;
        selectedQuiz = JSON.parse(content);
    });
});


app.listen(8080);