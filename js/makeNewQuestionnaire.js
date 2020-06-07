"use strict";

let newAnswerUniqueIdCounter = 3; 
//this starts at 3 because 2 answers are given by default, this is made
//so each newly generated element can have a unique id

let dropdownAnswerType;

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
    const questionValue = document.getElementById("questionInputField").value;
    const answerValueArray = [];

    let questionAndAnswers = {};
    questionAndAnswers.question = questionValue;

    for (let x = 0; x < answerFieldArray.length; x++){
        answerValueArray.push(answerFieldArray[x].value);
    }

    questionAndAnswers.answers = answerValueArray;
    return questionAndAnswers;
}

//method that sends the questionAndAnswers object and the dropDownAnswerType variable
//for processing 
function sendResultsToServer (dropdownAnswerType, questionAndAnswers){
    
}

//Onclick listener for add new answer button
const addAnswerButton = document.getElementById("addNewAnswer");

addAnswerButton.addEventListener('click', event => {
    addNewAnswer();
    newAnswerUniqueIdCounter += 1;

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

