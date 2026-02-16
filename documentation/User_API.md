# User API


The user API is an API for creating and deleting users.

POST	 /user	          Creates a user
DELETE	 /user/:id	      Deletes a user

------------------------------------------------
POST /user:

{{baseURL}}/user

The body requires a json object with a username, password and "consent" with the value set to true.

body example:

{
    "username": "testuser",
    "password": "qwerty123",
    "consent": true
}

A user with a unique id and hashed password is then created as shown here:

{
    "userId": "c619faf9-6c81-4239-9213-50b620ec322d",
    "username": "testuser",
    "consentGiven": true,
    "securePassword": "310b612cf297fc356e657dbf2a085eb2f56ac29cec378f1e6b852eda1a4f1904"
}

-------------------------------------------------
DELETE /user/:id:

{{baseURL}}/user/316085a0-4a9f-4bdc-8295-9a844c500310

Deletes the user with the given UserId.

--------------------------------------------------
