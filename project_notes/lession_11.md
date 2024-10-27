# Dev Tinder API Documentation

This document outlines the structure and organization of the API routes used in the Dev Tinder app.

## Key Concepts

### API and Express Routers

To efficiently manage the API routes in our application, it is essential to use the Express Router. Writing all the APIs in a single file (like `app.js`) can quickly become unmanageable as the app scales. Therefore, we should group APIs based on their functionality under separate routers.

**Express Router** allows us to create modular, mountable route handlers. A Router instance is a complete middleware and routing system that is often used as a mini-app.

### How to Implement Express Routers?

1. **Create separate routers**: Create routers for different features like authentication, profile management, and connection requests.
2. **Group related routes**: For instance, all authentication-related routes can be grouped under `authRouter`.
3. **Import routers in `app.js`**: Import and use the created routers in the main application file to keep the code organized and modular.

### Example:

```javascript
const express = require("express");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const connectionRequestRouter = require("./routes/connectionRequestRouter");

// Using routers in the app
const app = express();
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", connectionRequestRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Homework

- Explore Tinder APIs to understand how similar apps structure their routes.
- List down all potential apps and features for developing Tinder-like apps.
- Group multiple APIs under respective routes.

---

## Dev Tinder API Routes

### **authRouter** (Authentication)

- **POST /signup**  
  Allows new users to sign up.

- **POST /login**  
  Allows users to log in.

- **POST /logout**  
  Logs the user out.

### **profileRouter** (User Profile)

- **GET /profile/view**  
  View the user's profile.

- **GET /profile/edit**  
  Fetch the form or data needed to edit the profile.

- **PATCH /profile/password**  
  Update the user's password.

### **connectionRequestRouter** (Connection Requests)

- **POST /request/send/interested/:userId**  
  Send a connection request expressing interest.

- **POST /request/send/ignored/:userId**  
  Send a request indicating no interest.

- **POST /request/review/accepted/:requestId**  
  Accept a connection request.

- **POST /request/review/rejected/:requestId**  
  Reject a connection request.

### **userRouter** (User Connections)

- **GET /connections**  
  View the list of connections.

- **GET /requests/received**  
  View the list of received connection requests.

- **GET /feed**  
  Get a list of users in the feed.

---

## FAQs

### What is `express.Router` and why should we use it?

`express.Router` is a mini-app for handling routes. It allows us to create modular route handlers, making the code cleaner and more organized, especially in large applications. For more details, you can check out the [Express Router Documentation](https://expressjs.com/en/4x/api.html#router).

### How can I group APIs using Express Routers?

You can group related APIs by creating separate router files for each feature (like authentication or profile management). Then, import those routers into the main application file (`app.js`) and use them with appropriate base routes (e.g., `/auth`, `/profile`).

---

### Folder Structure Example

```
/routes
  └── authRouter.js
  └── profileRouter.js
  └── connectionRequestRouter.js

app.js
```
