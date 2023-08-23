# Waco Node.js Technical Test

This project consists of a backend and frontend that allow users to log in, view Pokémon, and add them to a list of favorite Pokémon.

## Getting Started

### Backend

1. Navigate to the backend directory.
2. Install the required dependencies by running `npm install`.
3. Make sure the `.env` file is present in the backend directory and contains the correct MongoDB connection string.
4. Build the project by running `npm run build`.
5. Start the web server by running `npm run start`.
6. The backend server should now be running. You can verify it by accessing `http://localhost:3000`.

For more detailed instructions, refer to the [backend README.md](backend/README.md).

### Frontend

1. Navigate to the frontend directory.
2. Install the required dependencies by running `npm install`.
3. Make sure the `.env` file is present in the frontend directory and contains the correct backend URL (e.g., `VITE_REACT_APP_API_URL=http://localhost:3000/`).
4. Build the project by running `npm run build`.
5. Preview the build by running `npm run preview`.
6. Your default web browser should open, and the application will be accessible at the URL provided by Vite (e.g., `http://127.0.0.1:5173/`).

For more detailed instructions, refer to the [frontend README.md](frontend/README.md).


## Usage

Once both the backend and frontend are running, you can use the application by following these steps:

### 1. Logging In

- Open the application in your browser at `http://localhost:3000`.
- Enter your username and password in the login form.
- Click the "Sign In" button.

### 2. Viewing Pokémon

- After logging in, you will see a list of your favorite Pokémon.
- You can browse through the list to see the Pokémon you have added as favorites.

### 3. Searching and Adding a Favorite Pokémon

- Use the search input at the bottom of the favorite Pokémon list to search for Pokémon by name.
- As you type, a list of matching Pokémon will appear in an autocomplete dropdown.
- Click on a Pokémon in the dropdown to add it to your list of favorite Pokémon.
- The selected Pokémon will appear in your favorite Pokémon list.

### 4. Logging Out

- Click the "Logout" button located in the profile section.
- You will be logged out and redirected to the login screen.

### Create User via API

You can create a new user by making a POST request to the `/register` endpoint. Below are the instructions for both Postman and cURL.

#### Using Postman

1. Open Postman.
2. Set the request method to POST.
3. Enter the URL for the register endpoint (e.g., `http://localhost:3000/register`).
4. In the "Body" tab, select "raw" and "JSON" from the dropdown.
5. Enter the user details in JSON format, for example:
   ```json
   {
       "username": "newuser",
       "email": "newuser@example.com",
       "password": "password123"
   }
   ```
6. Click "Send" to create the user.

#### Using cURL

You can also create a user using the cURL command in the terminal. Here's an example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "newuser", "email": "newuser@example.com", "password": "password123"}' http://localhost:3000/register
```

### Verify User

After creating a user, a verification link will be sent to the provided email address. The user can be verified by clicking on the link or by manually making a GET request to the `/verify` endpoint with the token. Below are the instructions for both manual methods.

#### Using the Verification Link

1. Open the email containing the verification link.
2. Click on the link to verify the user.
3. The user is now verified and can log in.

#### Using Postman

1. Open Postman.
2. Set the request method to GET.
3. Enter the URL for the verify endpoint along with the token (e.g., `http://localhost:3000/verify?token=YOUR_TOKEN_HERE`).
4. Click "Send" to verify the user.

#### Using cURL

You can also verify a user using the cURL command in the terminal. Here's an example:

```bash
curl -X GET http://localhost:3000/verify?token=YOUR_TOKEN_HERE
```

### Email Configuration for Verification

To enable email sending for user verification, you need to configure the following environment variables in the `.env` file. These variables are used to connect to the SMTP server and define the application URL.

1. **MAIL_USERID**: The user ID for the SMTP server.
2. **MAIL_PASS**: The password for the SMTP server.
3. **MAIL_PORT**: The port number used by the SMTP server.
4. **MAIL_SMTP**: The SMTP server address.
5. **APP_URL**: The URL of the application.

Here's an example of how to set these variables in the `.env` file:

```env
MAIL_USERID="de7428378e182e"
MAIL_PASS="b38d22432ec6fc"
MAIL_PORT=2525
MAIL_SMTP="sandbox.smtp.mailtrap.io"
APP_URL="localhost:3000"
```

Make sure to replace the values with your actual SMTP server credentials and application URL.

Once these variables are set, the application will be allowed to send a verification email to the user's email address when they register. The email will contain a link to verify the user's account.

#### Email Testing with Mailtrap
Currently, email testing is being done using https://mailtrap.io/, a service that allows you to test email notifications without sending them to real users. This helps in avoiding spam and ensures that the email functionality is working correctly.
