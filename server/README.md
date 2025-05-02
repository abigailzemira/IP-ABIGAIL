# Individual Project Phase 2

## Books API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
Some endpoints require authentication using a JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Endpoints

#### Authentication

##### Register User
- **POST** `/register`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string",
    "username": "string"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "email": "string",
    "username": "string"
  }
  ```
- **Error Response (400):**
  ```json
  {
    "message": "Email and password are required"
  }
  ```
  ```json
  {
    "message": "Email already in use"
  }
  ```

##### Login
- **POST** `/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "access_token": "string"
  }
  ```
- **Error Response (401):**
  ```json
  {
    "message": "Invalid email/password"
  }
  ```

##### Google Login
- **POST** `/login/google`
- **Body:**
  ```json
  {
    "googleToken": "string"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "access_token": "string"
  }
  ```
- **Error Response (400):**
  ```json
  {
    "message": "Google Token is required"
  }
  ```
- **Error Response (401):**
  ```json
  {
    "message": "Invalid token"
  }
  ```

#### Categories

##### Get All Category Headers
- **GET** `/categoryHeaders`
- **Success Response (200):**
  ```json
  [
    {
      "id": "number",
      "name": "string",
      "imageUrl": "string",
      "Categories": [
        {
          "id": "number",
          "name": "string"
        }
      ]
    }
  ]
  ```

##### Get All Categories
- **GET** `/categories`
- **Success Response (200):**
  ```json
  [
    {
      "id": "number",
      "name": "string"
    }
  ]
  ```

##### Get Category Books
- **GET** `/categories/:id/books`
- **Success Response (200):**
  ```json
  {
    "id": "number",
    "name": "string",
    "Books": [
      {
        "id": "number",
        "name": "string",
        "synopsis": "string",
        "cover": "string"
      }
    ]
  }
  ```
- **Error Response (404):**
  ```json
  {
    "message": "Category not found"
  }
  ```

#### Books

##### Get Book by ID
- **GET** `/books/:id`
- **Success Response (200):**
  ```json
  {
    "id": "number",
    "name": "string",
    "synopsis": "string",
    "cover": "string",
    "Category": {
      "id": "number",
      "name": "string"
    }
  }
  ```
- **Error Response (404):**
  ```json
  {
    "message": "Book not found"
  }
  ```

#### Owned Books (Protected Routes)
All these endpoints require authentication.

##### Get User's Owned Books
- **GET** `/ownedBooks`
- **Required:** Authentication
- **Success Response (200):**
  ```json
  [
    {
      "id": "number",
      "BookId": "number",
      "UserId": "number",
      "status": "string",
      "Book": {
        "id": "number",
        "name": "string",
        "synopsis": "string",
        "cover": "string"
      }
    }
  ]
  ```

##### Add Book to Owned Books
- **POST** `/ownedBooks/:bookId`
- **Required:** Authentication
- **Success Response (201):**
  ```json
  {
    "id": "number",
    "BookId": "number",
    "UserId": "number",
    "status": "string"
  }
  ```
- **Error Response (404):**
  ```json
  {
    "message": "Book not found"
  }
  ```

##### Update Owned Book
- **PUT** `/ownedBooks/:id`
- **Required:** Authentication
- **Body:**
  ```json
  {
    "status": "string"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "id": "number",
    "BookId": "number",
    "UserId": "number",
    "status": "string"
  }
  ```
- **Error Response (400):**
  ```json
  {
    "message": "Status is required"
  }
  ```
- **Error Response (404):**
  ```json
  {
    "message": "Owned book not found"
  }
  ```

##### Delete Owned Book
- **DELETE** `/ownedBooks/:id`
- **Required:** Authentication
- **Success Response (200):**
  ```json
  {
    "message": "Book removed successfully"
  }
  ```
- **Error Response (404):**
  ```json
  {
    "message": "Owned book not found"
  }
  ```

#### Recommendations (Protected Route)

##### Get Book Recommendations
- **GET** `/recommendations`
- **Required:** Authentication
- **Success Response (200):**
  ```json
  [
    {
      "title": "string",
      "author": "string",
      "reason": "string",
      "cover": "string",
      "id": "number"
    }
  ]
  ```
- Empty array is returned if user has no books

### Error Responses
All endpoints may return these errors:

- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "message": "Please login first"
  }
  ```
  ```json
  {
    "message": "Invalid token"
  }
  ```

