# User API


The user API is an API for creating and deleting users.

POST	 /user	          Creates a user
POST     /user/login      Logs in the user
GET      /user/profile    Retrieves user's profile information
DELETE	 /user/:id	      Anonymizes the user


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

A user with a unique id is then created as shown here:

{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "username": "testuser",
    "consent": true
  }
}

-------------------------------------------------
POST /user/login:

{{baseURL}}/user/login

The body requires a json object with a username, and password.

body example:

{
    "username": "testuser",
    "password": "qwerty123"
}

The user is logged in and returns a JWT-token:

{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "username": "testuser",
    "consent": true
  },
  "token": "JWT_TOKEN"
}

-------------------------------------------------
GET /user/profile:

{{baseURL}}/user/profile

The header requires a valid token.

header example:

Authorization: Bearer JWT_TOKEN

The user's profile information is retrieved:

{
  "user": {
    "id": "uuid",
    "username": "testuser",
    "consent": true
  }
}

-------------------------------------------------
DELETE /user/:id:

{{baseURL}}/user/{userId}

The header requires a valid token.

header example:

Authorization: Bearer JWT_TOKEN

Anonymizes the user with the given UserId. The username is changed to anonymous_uiid, password is set to null and consent is set to false.

Response:

{
  "message": "User anonymized successfully"
}

--------------------------------------------------
