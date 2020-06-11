"use strict";

let questionnaireToBeRendered = [];
let uniqueIDCounter = 0;

const QAarr = [];


//receives an object from the server that contains the questionnaire that needs
//to be rendered
async function getQuestionnaire(){
    const response = await fetch('/api/answerQuestionnaire');
    const questionnaire = await response.json();
    questionnaireToBeRendered = questionnaire;
}

//renders the questionnaire to the webpage
function renderQuestionnaire(){
    reveal.remove();
    const section = document.getElementById('questionnaire');
    let customIndex = 0;//customIndex was made as i tried to use x and i from the loops to keep track
    //of indexing and adding/modifying elements and crashed my own pc in the process
    const qTitle = document.createElement('h1');

    qTitle.innerHTML = questionnaireToBeRendered[0].title;
    section.appendChild(qTitle);

    for (let i = 0; i < questionnaireToBeRendered.length ; i++){
        const question = document.createElement('h2');
        const newSection = document.createElement('section');
        newSection.id = i;

        question.innerHTML = questionnaireToBeRendered[i].question;
        QAarr.push(question.innerHTML);
        newSection.appendChild(question);
        section.appendChild(newSection);
        
        for (let x = 0; x < questionnaireToBeRendered[customIndex].answers.length; x++){

            if (questionnaireToBeRendered[customIndex].answerType == "text"){
                const answerText = document.createElement('input');

                answerText.type = "text";
                answerText.placeholder = 'Enter an answer.';
                answerText.id = "text" + uniqueIDCounter;
                QAarr.push(answerText);

                newSection.appendChild(answerText);
                section.appendChild(newSection);
            }

            if (questionnaireToBeRendered[customIndex].answerType == "radio"){
                const answerRadio = document.createElement('input');
                const label = document.createElement('label');
                
                answerRadio.type = "radio";
                answerRadio.name = 'radio' + customIndex;
                answerRadio.value = 'radio' + customIndex;
                answerRadio.id = "radio" + uniqueIDCounter;
                QAarr.push(answerRadio);

                label.htmlFor = 'radio' + customIndex;
                label.innerHTML = questionnaireToBeRendered[customIndex].answers[x];

                newSection.appendChild(answerRadio);
                newSection.appendChild(label);
                section.appendChild(newSection);
            }
            uniqueIDCounter+=1;
        }
        customIndex+=1;
        uniqueIDCounter+=1; 
    }
    
}

function readAnswers(){
    console.log(QAarr);
}

document.onreadystatechange = function(){
    if (document.readyState === 'interactive'){
        getQuestionnaire();
        
    }
}
//once again i had to attach the render method to an onclick because it wouldn't
//work in any of the document's ready states
const reveal = document.getElementById("revealButton");
reveal.addEventListener('click', event =>{
    renderQuestionnaire();
});
