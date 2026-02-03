# User API


The user API is an API for creating and deleting users.

POST	 /user	          Creates a user
DELETE	 /user/:id	      Deletes a user

------------------------------------------------
POST /user:

{{baseURL}}/user

The body requires "consent" with the value set to true.

body example:

{
    "consent": true
}

A user with a unique id is then created as shown here:

{
    "userId": "316085a0-4a9f-4bdc-8295-9a844c500310",
    "consentGiven": true
}

-------------------------------------------------
DELETE /user/:id:

{{baseURL}}/user/316085a0-4a9f-4bdc-8295-9a844c500310

Deletes a user.

--------------------------------------------------
