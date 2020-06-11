"use strict";

let newAnswerUniqueIdCounter = 3; 
//this starts at 3 because 2 answers are given by default, this is made
//so each newly generated element can have a unique id

let addQuestionCounter = 0;
//this is made so each radio button group can be unique across different questions

//makes an array for all the instances of the element "removeButton"
const removeButtonArray = [document.getElementById("removeButton1")];
removeButtonArray.push(document.getElementById("removeButton2"));

//makes an array that stores all instances of the element "answerField"
const answerFieldArray = [document.getElementById("answerField1")];
answerFieldArray.push(document.getElementById("answerField2"));
//this is made so each question/answer object gets added to an array that encapsulates 
//the entire questionnaire, which then gets sent to the server
let arrayOfQuestions = [];

//Method that adds a new answer input field and new remove answer button
function addNewAnswer(){
    const newAnswer = document.createElement('input');
    const newSection = document.createElement('section');
    const newRemoveButton = document.createElement('input');

    newSection.id = "AnswerSection" + newAnswerUniqueIdCounter;

    newAnswer.className = "answerClass";
    newAnswer.type = "text";
    newAnswer.placeholder = "Enter an answer.";
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
// index value to from either 1 or 2, to text or radio so it can then later be processed
function readAnswerType(){
    const dropdown = document.getElementById("questionTypesList");
    const userSelection = dropdown.options[dropdown.selectedIndex].value;
    let dropdownAnswerType;
    
    if (userSelection == 1){
        dropdownAnswerType =  "text";
    }

    if (userSelection == 2){
        dropdownAnswerType = "radio";
    }
    return dropdownAnswerType;

}

//this method reads and saves the question and answer choices and returns them
function readQuestionAndAnswers(){
    const answerValueArray = [];
    let questionAndAnswers = {};
    const answerType = readAnswerType();

    questionAndAnswers.question = document.getElementById("questionInputField").value;
    questionAndAnswers.title = document.getElementById("questionnaireTitle").value;
    //this was added to keep the answerFieldArray array up to date with
    //the currently present answer text fields in the dom, there was a bug
    //where deleted answers remained present in the questionAndAnswers object
    const answerFields = document.querySelectorAll(".answerClass");
    for (let i = 0 ; i < answerFields.length ; i++ ){
        if (answerFieldArray[i] != answerFields[i]){
            answerFieldArray.splice(i , 1);
        }
    }
    if (answerType == 'radio'){
        for (let x = 0; x < answerFieldArray.length; x++){
        answerValueArray.push(answerFieldArray[x].value);
        }
    }
    
    questionAndAnswers.answers = answerValueArray;
    return questionAndAnswers;
}


//this method builds and formats the question that can be viewed like the person answering
//the questionnaire sees it, these will get added everytime the add to questionnaire
//button is clicked
function buildQuestion(){
    const QAObj = readQuestionAndAnswers();
    const answerTypeObj = readAnswerType();
    const viewQuestionSection = document.getElementById("questionEditorSection");

    const formattedSection = document.createElement('section');
    const formattedQuestion = document.createElement('p');

    formattedQuestion.innerHTML = QAObj.question;
    formattedSection.appendChild(formattedQuestion);

    if (answerTypeObj == 'text'){
        const formattedAnswers = document.createElement('input');
        formattedAnswers.placeholder = 'Enter an answer.';
        formattedSection.appendChild(formattedAnswers);
    }

    if (answerTypeObj == 'radio'){
        for (let i = 0 ; i < QAObj.answers.length ; i++){
            const formattedAnswers = document.createElement('input');
            const answerLabel = document.createElement('label');

            formattedAnswers.type = answerTypeObj;
            formattedAnswers.value = addQuestionCounter;
            formattedAnswers.name = addQuestionCounter;

            answerLabel.htmlFor = addQuestionCounter;
            answerLabel.innerHTML = QAObj.answers[i];
            
            formattedSection.appendChild(formattedAnswers);
            formattedSection.appendChild(answerLabel);
        }
    }
    //the question/answers/answerType object gets encapsulated here as this gets
    //called every time a new question is added anyway, so it diminishes a need
    //to make another method just for this
    QAObj.answerType = answerTypeObj;
    arrayOfQuestions.push(QAObj);

    viewQuestionSection.appendChild(formattedSection);

    
}

async function sendResultsToServer(){
    const response = await fetch('/api/questionnaires', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(arrayOfQuestions)
    });
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
    buildQuestion();
    addQuestionCounter += 1;
});

const submitQuestion = document.getElementById("submitButton");
submitQuestion.addEventListener('click', event =>{
    sendResultsToServer();
});

