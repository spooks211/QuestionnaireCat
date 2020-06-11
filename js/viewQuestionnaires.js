"use strict";

//arrayFiles is an array that contains all files present in the questionnaires folder
const arrayOfFiles = [];
//selected button array contains all buttons that represent a questionnaire, this is needed for the onclick
const selectedButtonArray = [];
//selectedfile is sent off to the server, it's the quiz that was selected from the buttonarray
let selectedFile = {};

//asks the server for a list of all files in the questionnaires directory
async function getListFromServer(){
    const response = await fetch('/api/viewQuestionnaires');
    const directory = await response.json();
    arrayOfFiles.push(directory);
}
//constructs buttons for each file in the questionnaire directory
function displayListOfFiles(){
    revealButton.remove();
    const buttonSection = document.getElementById('listOfFiles');

    for (let i = 0; i < arrayOfFiles[0].length; i++){
        let questionnaireSelector = document.createElement('input');
        questionnaireSelector.type = 'button';
        questionnaireSelector.id = arrayOfFiles[0][i]; //its a nested array so double indexes are needed
        questionnaireSelector.value = arrayOfFiles[0][i];
        questionnaireSelector.class = "questionSelector";
        //i added this second class so when it gets passed to the postRequest function
        //the server will know which file to send, for some reason it refused to send id
        //or value because ??? so i just made another class
        questionnaireSelector.class = arrayOfFiles[0][i];
        selectedButtonArray.push(questionnaireSelector);
        buttonSection.appendChild(questionnaireSelector);
    }//onclick listener for the questionnaire buttons
    for (let x = 0; x < selectedButtonArray.length; x++){
        selectedButtonArray[x].addEventListener('click', onClickCallFunction(x));
    }
}
//function that's executed when one of the questionnaire buttons is clicked
function onClickCallFunction(x){
    return function (){
        selectedFile = selectedButtonArray[x];
        postRequest();
    }
}
//sends the server which questionnaire was selected by the user
async function postRequest(){
    const questionnaireFile = await fetch('/api/viewQuestionnaires',{
        'method': 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(selectedFile)
    });
}
//runs the getListFromServer method while the page is being loaded
document.onreadystatechange = function(){
    if (document.readyState === 'interactive'){
        getListFromServer();
    }
}
//i added this reveal button because the displayListOfFiles just wouldn't be called
//while the page is being loaded
const revealButton = document.getElementById('clickToReveal');
revealButton.addEventListener('click', event =>{
    displayListOfFiles();
});


