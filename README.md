# Book Management API

This is a simple RESTful API for managing book entries using Node.js, Express And Mongodb.

## Setting Up

1. Clone the repository:

2. Navigate to the project directory:

3. Install dependencies:
   npm install

4. Set up environment variables:

- Create a `.env` file in the root directory.
- Define the following environment variables:
  ```
  PORT=3000
  MONGODB_URI=<your_mongodb_uri>
  JWT_SECRET=<your_jwt_secret>
  EXPRESS_IN=<of your choice>
  ```

## Running the API

Start the server: npm start

The server will start running on `http://localhost:3000` by default.

## API Endpoints

- **Book Management:**

  - Add a Book: `POST /api/books/addBook`
  - Get All Books: `GET /api/books/getBooks`
  - Get Book by ID: `GET /api/books/getBookById/:id`
  - Update Book: `PUT /api/books/updateBook/:id`
  - Delete Book: `DELETE /api/books/deleteBook/:id`

- **Authentication:**
  - User Registration: `POST /api/auth/register`
  - User Login: `POST /api/auth/login`
  - User Logout: `POST /api/auth/logout`
