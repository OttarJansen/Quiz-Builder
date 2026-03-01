# Quiz API


The Quiz API is an API for creating, retrieving, updating and deleting quizzes.

POST	 /quizzes	      Creates a quiz
GET	     /quizzes	      Returns all quizzes 
GET	     /quizzes/:id	  Returns a quiz
PUT	     /quizzes/:id	  Updates a quiz
DELETE	 /quizzes/:id	  Deletes a quiz

-----------------------------------------------
GET /quizzes:

{{baseURL}}/quizzes

retrieves all quizzes.

------------------------------------------------
GET /quizzes/:id:

{{baseURL}}/quizzes/:id 

retrieves a quiz.

------------------------------------------------
POST /quizzes:

{{baseURL}}/quizzes

The body requires a title and questions with options.

body example:

{
  "title": "Math Test",
  "questions": [
    {
      "text": "Which numbers are odd?",
      "options": ["3", "4", "5"],
      "correctOptions": ["3", "5"]
    },
    {
      "text": "Is 1 bigger than 2?",
      "options": ["Yes", "No"],
      "correctOptions": ["No" ]
    }
  ]
}

-------------------------------------------------
PUT /quizzes/:id: "coming soon"

{{baseURL}}/quizzes/1

Same body requirements as POST /quizzes.

body example:

{
  "title": "Updated Quiz",
  "questions": [
    {
      "text": "Is this a test?",
      "options": ["Yes", "No"],
      "correctOption": "Yes"
    }
  ]
}

--------------------------------------------------
DELETE /quizzes/:id:

{{baseURL}}/quizzes/1

deletes a quiz.

--------------------------------------------------