1. npm install
2. npm start

This will start the server and the pages will be up and running. Connect to localhost:8080 for the
index.html.

To go back or forward a page simply use your browser's back and forward buttons or you can navigate by entering the specific paths.

Paths and their meanings:

localhost:8080 -> index

localhost:8080/viewQuestionnaires -> view all made and saved questionnaires

localhost:8080/answerQuestionnaires -> for this to properly work you need to go through viewQuestionnaires or the questionnaire json file won't be sent over from the server.

localhost:8080/makeQuestionnaire -> to make a questionnaire

localhost:8080/downloadAnswers -> to download answers for specific questionnaires that were answered.

Safest way to avoid crashes is to go through localhost:8080 every time.