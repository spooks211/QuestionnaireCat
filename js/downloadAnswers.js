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
        const downloadButtons = document.createElement('input');

        downloadButtons.type = 'button';
        downloadButtons.id = arrayOfAnswerFiles[0][i];
        downloadButtons.value = arrayOfAnswerFiles[0][i];
        downloadButtons.class = arrayOfAnswerFiles[0][i];
        selectedButton.push(downloadButtons);
        section.appendChild(downloadButtons);
    }
    for (let x = 0; x < selectedButton.length; x++){
        selectedButton[x].addEventListener('click', clickDownload(x));
    }
} 

//function that processes the click
function clickDownload(x){
    return function(){
    downloadFile = selectedButton[x].id;
    console.log(downloadFile);
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

