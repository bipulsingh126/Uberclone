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

## User Login Endpoint

### POST /users/login

Authenticate a user and return a token.

#### Request Body

```json
{
  "email": "john@example.com", // Required, valid email format
  "password": "password123"    // Required, min 6 characters
}
```

#### Validation Rules

- **email**: 
  - Required
  - Must be valid email format
  - Will be normalized

- **password**: 
  - Required
  - Minimum 6 characters

#### Responses

##### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      // User details
    },
    "token": "jwt-token"
  }
}
```

##### Error Response (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

##### Error Response (400 Bad Request)
```json
{
  "success": false,
  "errors": [
    // List of validation errors
  ]
}
```

## User Logout Endpoint

### GET /users/logout

Logs out the user by clearing the authentication token and adding it to a blacklist.

#### Headers

- **Authorization**: Bearer token (optional if token is in cookies)

#### Responses

##### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

##### Error Response (401 Unauthorized)
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

##### Error Response (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Failed to logout user"
}
```

## Captain Registration Endpoint

### POST /captains/register

Register a new captain in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "John",     // Required, min 3 characters
    "lastname": "Doe"        // Required, min 3 characters
  },
  "email": "john@example.com", // Required, valid email format
  "password": "password123",    // Required, min 6 characters
  "vehicle": {
    "color": "red",            // Required, min 3 characters
    "plate": "ABC123",         // Required, min 3 characters
    "capacity": 4,             // Required, must be at least 1
    "vehicleType": "car"       // Required, must be one of: car, motorcycle, auto
  }
}
```

#### Validation Rules

- **firstname**: 
  - Required
  - Minimum 3 characters
  - Will be trimmed of whitespace

- **lastname**: 
  - Optional
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

- **vehicle.color**: 
  - Required
  - Minimum 3 characters

- **vehicle.plate**: 
  - Required
  - Minimum 3 characters

- **vehicle.capacity**: 
  - Required
  - Must be an integer and at least 1

- **vehicle.vehicleType**: 
  - Required
  - Must be one of: car, motorcycle, auto

#### Responses

##### Success Response (201 Created)
```json
{
  "success": true,
  "data": {
    "captain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "_id": "captain_id_here"
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

###### Captain Already Exists (400 Bad Request)
```json
{
  "success": false,
  "message": "Captain already exists with this email"
}
```

###### Server Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Failed to register captain"
}
```

#### Notes

- All string fields are trimmed of leading and trailing whitespace.
- Emails are normalized (lowercase and removal of unnecessary dots).
- Passwords are hashed before storage.
- A JWT token is generated and returned upon successful registration.
- The returned captain object does not include the password field.

# Captain Routes Documentation

## POST /register
### Request Body
```json
{
  "email": "string", // Required: Must be a valid email format
  "fullname": {
    "firstname": "string" // Required: Must be at least 3 characters long
    "lastname": "string" // Optional: Can be included, no length requirement
  },
  "password": "string", // Required: Must be at least 6 characters long
  "vehicle": {
    "color": "string", // Required: Must be at least 3 characters long
    "plate": "string", // Required: Must be at least 3 characters long
    "capacity": 1, // Required: Must be an integer, at least 1
    "vehicleType": "string" // Required: Must be one of ["car", "motorcycle", "truck"]
  }
}
```

### Response
#### Success (201)
```json
{
  "success": true,
  "data": {
    "captain": {
      // Captain object details (e.g., id, email, etc.)
    }
  }
}
```

#### Error (400)
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Error message", // Description of the validation error
      "param": "field_name" // The field that caused the error
    }
  ]
}
```

---

## POST /login
### Request Body
```json
{
  "email": "string", // Required: Must be a valid email format
  "password": "string" // Required: Must be at least 6 characters long
}
```

### Response
#### Success (200)
```json
{
  "success": true,
  "data": {
    "captain": {
      // Captain object details (e.g., id, email, etc.)
    }
  }
}
```

#### Error (400)
```json
{
  "success": false,
  "message": "Invalid email or password" // General error message
}
```

---

## GET /profile
### Response
#### Success (200)
```json
{
  "success": true,
  "data": {
    "captain": {
      // Captain object details (e.g., id, email, etc.)
    }
  }
}
```

#### Error (401)
```json
{
  "success": false,
  "message": "Unauthorized" // If the user is not authenticated
}
```

---

## GET /logout
### Response
#### Success (200)
```json
{
  "success": true,
  "message": "Logged out successfully" // Confirmation of logout
}
```

#### Error (401)
```json
{
  "success": false,
  "message": "Unauthorized" // If the user is not authenticated
}
```
