"use strict";

let newAnswerUniqueIdCounter = 3; 
//this starts at 3 because 2 answers are given by default, this is made
//so each newly generated element can have a unique id

//makes an array for all the instances of the element "removeButton"
const removeButtonArray = [document.getElementById("removeButton1")];
removeButtonArray.push(document.getElementById("removeButton2"));

//makes an array that stores all instances of the element "answerField"
const answerFieldArray = [document.getElementById("answerField1")];
answerFieldArray.push(document.getElementById("answerField2"));

//Method that adds a new answer input field and new remove answer button
function addNewAnswer(){
    const newAnswer = document.createElement('input');
    const newSection = document.createElement('section');
    const newRemoveButton = document.createElement('input');

    newSection.id = "AnswerSection" + newAnswerUniqueIdCounter;

    newAnswer.className = "inputField";
    newAnswer.type = "text";
    newAnswer.placeholder = "Enter an answer";
    newAnswer.id = "answerField" + newAnswerUniqueIdCounter;
    answerFieldArray.push(newAnswer);

    newRemoveButton.className = "inputField";
    newRemoveButton.type = "button";
    newRemoveButton.value = "Remove answer";
    newRemoveButton.id = "removeButton" + newAnswerUniqueIdCounter;
    removeButtonArray.push(newRemoveButton);

    //the onclick listener is made here rather than at the bottom of the code
    //so the newly made remove buttons get added to and selected from the array
    //properly
    for (let i = 0; i < removeButtonArray.length; i++){
        removeButtonArray[i].addEventListener('click', removeAnswer(i));     
    }

    newSection.appendChild(newAnswer);
    newSection.appendChild(newRemoveButton);

    const answerContainer = document.getElementById("QandASection");
    answerContainer.appendChild(newSection);
}


//removes the parent element (AnswerSection) of whichever button is clicked,
//is called from addNewAnswer()
function removeAnswer(i){
    return function(){
        removeButtonArray[i].parentElement.remove();
    }
}

// this method reads the answer type selected in the dropdown menu, then converts the
// index value to from either 1 or 2, to text or checkbox so it can then later be processed
function readAnswerType(){
    const dropdown = document.getElementById("questionTypesList");
    const userSelection = dropdown.options[dropdown.selectedIndex].value;
    let dropdownAnswerType;
    
    if (userSelection == 1){
        dropdownAnswerType =  "text";
    }

    if (userSelection == 2){
        dropdownAnswerType = "checkbox";
    }
    return dropdownAnswerType;

}

//this method reads and saves the question and answer choices and returns them
function readQuestionAndAnswers(){
    const answerValueArray = [];
    let questionAndAnswers = {};

    questionAndAnswers.question = document.getElementById("questionInputField").value;

    for (let x = 0; x < answerFieldArray.length; x++){
        answerValueArray.push(answerFieldArray[x].value);
    }

    questionAndAnswers.answers = answerValueArray;
    return questionAndAnswers;
}

function buildQuestion(dropdownAnswerType, questionAndAnswers){
    const formattedSection = document.createElement('section');
    const formattedQuestion = document.createElement('p');
    formattedQuestion.value = questionAndAnswers.question;


    for (let n = 0 ; n < questionAndAnswers.answers.length ; n++){
        const formattedAnswers = document.createElement(dropdownAnswerType);
        if (dropdownAnswerType == 'text'){
            formattedAnswers.placeholder = questionAndAnswers.answers[n].value;
        }
        if (dropdownAnswerType == 'checkbox'){
            formattedAnswers.label = questionAndAnswers.answers[n].value;
        }
    } 
}

//method that sends the questionAndAnswers object and the dropDownAnswerType variable
//to the server for processing 
function sendResultsToServer (dropdownAnswerType, questionAndAnswers){

}

//Onclick listener for add new answer button
const addAnswerButton = document.getElementById("addNewAnswer");

addAnswerButton.addEventListener('click', event => {
    addNewAnswer();
    newAnswerUniqueIdCounter += 1; //this is so every time new answer is clicked it
    //increments by one, meaning each new ID is unique when it is assigned in
    //the addNewAnswer method

});

//Onclick listener for add to questionnaire button
//calls the readAnswertype function also, so it gets submitted to the server
//with the rest of the page
const addQuestionButton = document.getElementById("addNewQuestionSubmitButton");

addQuestionButton.addEventListener('click', event => {
    readAnswerType();
    readQuestionAndAnswers();
    sendResultsToServer();
});

