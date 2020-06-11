"use strict";

//stores all of the answer file names
const arrayOfAnswerFiles = [];
//used for the onclick to download
const selectedButton = [];
//stores the specific file name for which file needs to be downloaded
let downloadFile = [];

//gets a list of all the answer.json files in answers
async function getListOfAnswerFiles(){
    const response = await fetch('/api/downloadAnswers');
    const directory = await response.json();
    arrayOfAnswerFiles.push(directory);
}

//renders the page and contains the onclick handler to download
function createFileElements(){
    revealButton.remove();
    const section = document.getElementById("buttonDownloadSection");

    for (let i = 0; i < arrayOfAnswerFiles[0].length; i++){
        const downloadButtons = document.createElement('a');
        downloadButtons.href = `assets/answers/${arrayOfAnswerFiles[0][i]}`;
        downloadButtons.download = arrayOfAnswerFiles[0][i];
        downloadButtons.id = arrayOfAnswerFiles[0][i];
        downloadButtons.textContent = arrayOfAnswerFiles[0][i];
        downloadButtons.class = arrayOfAnswerFiles[0][i];
        selectedButton.push(downloadButtons);
        section.appendChild(downloadButtons);
    }
}

//gets all the answer files from the server onload
document.onreadystatechange = function(){
    if (document.readyState === 'interactive'){
        getListOfAnswerFiles();
    }
}
// none of the readystates worked to render the page so it's done onclick
const revealButton = document.getElementById('clickToReveal');
revealButton.addEventListener('click', event =>{
    createFileElements();
});

