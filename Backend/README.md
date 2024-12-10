# Uberclone API Documentation

## User Registration Endpoint

### POST /users/register

Register a new user in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "John",     // Required, min 3 characters
    "lastname": "Doe"        // Required, min 3 characters
  },
  "email": "john@example.com", // Required, valid email format
  "password": "password123"    // Required, min 6 characters
}
```

#### Validation Rules

- **firstname**: 
  - Required
  - Minimum 3 characters
  - Will be trimmed of whitespace

- **lastname**: 
  - Required
  - Minimum 3 characters
  - Will be trimmed of whitespace

- **email**: 
  - Required
  - Must be valid email format
  - Will be normalized
  - Must be unique in the system

- **password**: 
  - Required
  - Minimum 6 characters
  - Will be hashed before storage

#### Responses

##### Success Response (201 Created)
```json
{
  "success": true,
  "data": {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "_id": "user_id_here"
    },
    "token": "jwt_token_here"
  }
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

###### User Already Exists (400 Bad Request)
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

###### Server Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Failed to register user"
}
```

#### Notes

- All string fields are trimmed of leading and trailing whitespace
- Emails are normalized (lowercase and removal of unnecessary dots)
- Passwords are hashed before storage
- A JWT token is generated and returned upon successful registration
- The returned user object does not include the password field
