# book_api

This project involves the creation of a RESTful API using Express.js, incorporating user authentication with JSON Web
Tokens (JWT), and utilizing MongoDB as the database. The API allows users to effectively manage a collection of books by
providing functionalities to create, retrieve, update, and delete book records.

## Overview

- User authentication using JSON Web Tokens (JWT).
- CRUD operations for managing a collection of books.
- Integration of MongoDB as the database.
- Error handling and data validation for maintaining data integrity.

## Setup

### To run this project locally on your machine:

### ```Fill the environment variables in the .env.example file```

### ```and rename it to .env ```

### Local Setup

1. Clone the repository:
   ```sh
   git clone hhttps://github.com/3bdElsamea/book_api.git
   ```

2. Navigate to the project directory:
   ```sh
   cd book-api
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Configure MongoDB connection in the `config.js` file.

5. Start the server:
    - For production environment use:
      ```sh
      npm start
      ```
    - For development environment use:
      ```sh
      npm run dev
      ```

## API Documentation

### User Routes

- **POST /api/register**: Register a new user.
- **POST /api/login**: Log in as a user.
- **POST /api/logout**: Log out the authenticated user.
- **GET /api/user/me**: Get the authenticated user's profile details.
- **PATCH /api/user/me**: Update the authenticated user's profile details.

### Book Routes

- **POST /api/books**: Create a new book.
- **GET /api/books**: Fetch a list of all books.
- **GET /api/books/:id**: Fetch details of a specific book.
- **PUT /api/books/:id**: Update a book's details.
- **DELETE /api/books/:id**: Delete a book.


