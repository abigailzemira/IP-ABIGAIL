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

#### Categories

##### Get All Category Headers
- **GET** `/categoryHeaders`
- **Success Response (200):**
  ```json
  [
    {
      "id": "number",
      "name": "string",
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

##### Get All Books
- **GET** `/`
- **Success Response (200):**
  ```json
  [
    {
      "id": "number",
      "name": "string"
    }
  ]
  ```

##### Get Book by ID
- **GET** `/books/:id`
- **Success Response (200):**
  ```json
  {
    "id": "number",
    "name": "string",
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
      "bookId": "number",
      "userId": "number"
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
    "bookId": "number",
    "userId": "number"
  }
  ```

##### Update Owned Book
- **PUT** `/ownedBooks/:id`
- **Required:** Authentication
- **Success Response (200):**
  ```json
  {
    "message": "Owned book updated successfully"
  }
  ```

##### Delete Owned Book
- **DELETE** `/ownedBooks/:id`
- **Required:** Authentication
- **Success Response (200):**
  ```json
  {
    "message": "Owned book deleted successfully"
  }
  ```

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
    "message": "Invalid email/password"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Email and password are required"
  }
  ```

