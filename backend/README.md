# Waco Node.js Technical Test

This project provides a backend service for managing users and their favorite Pokémon.

## Requirements

- Node.js (v16 or higher recommended)
- MongoDB (cloud services or local)

## Environment Variables

You'll need to create a `.env` file in the root directory of the project with the following content:

```env
DB_URI=mongodb+srv://tech-admin:qQieDnIgfup2YzDP@cluster0.j5vv3oz.mongodb.net/?retryWrites=true&w=majority
```
Replace the DB_URI value with your MongoDB connection string if needed.

## Installation
- Clone the repository.
- Navigate to the project directory.
- Run npm install to install the dependencies.

### Compilation
You can compile the TypeScript code by running:

```bash
npm run build
```

### Running the Project

You can start the project using:

```bash
npm start
```

For development, you can use the watch mode:

```bash
npm run watch:ts
npm run watch:nodemon
```
Testing
Run the tests using:

```bash
npm test
```

## User Routes
Here are the available user-related routes:

`GET /users`: Get all users.
`POST /login`: Log in a user.
`POST /users/favorites`: Add a favorite Pokémon for a user.
`GET /users/favorites/:userId`: Get favorite Pokémon for a specific user.
`POST /register`: Register a new user.
`GET /verify`: Verify a user's email.
