# MongoDB with Mongoose and Express.js

This document provides a step-by-step guide to integrate MongoDB with Mongoose in a Node.js application.

## MongoDB Concepts

- **Database**: A database in MongoDB stores collections of documents. It is equivalent to a database in traditional RDBMS systems.
- **Schema**: A schema in MongoDB defines the structure of documents within a collection.
- **Cluster**: A MongoDB cluster is a group of servers that store your data, manage queries, and provide high availability.
- **Document**: A document in MongoDB is a single record, represented as a JSON-like object.
- **Collection**: A collection in MongoDB is a group of MongoDB documents, akin to a table in relational databases.
- **Model**: A Mongoose model provides an interface to interact with MongoDB collections, allowing CRUD operations on documents.

## Steps to Implement MongoDB with Mongoose

### 1. Create a Free Cluster in MongoDB Atlas

- Visit the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas) and create a free account.
- After logging in, create a free cluster by following the on-screen instructions and setting up your database.

### 2. Install Mongoose Library

In your application directory, run the following command to install Mongoose:

```bash
npm install mongoose
```

### 3. Connect Your Application to MongoDB

In `database.js`, use the following code to establish a connection to MongoDB:

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://venkatesh131755:yGiIuGKu7odxPDk5@mynodecluster.r553g.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
```

### 4. Call the ConnectDB Function Before Starting the Application

In `app.js`, call the `connectDB` function before starting your server on port 8888:

```js
const connectDB = require("./config/database.js");
connectDB()
  .then(() => {
    console.log("DB connection made successfully...");
    app.listen(8888, () => {
      console.log("application started on port:8888 successfully");
    });
  })
  .catch((err) => {
    console.error("DB connection failed!!!!");
  });
```

### 5. Create a User Schema and Model

In `user.js`, define the user schema and model as follows:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
```

### 6. Create a POST /signup API

In `app.js`, create an Express POST route for user signup:

```js
const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./model/user.js");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Rakesh",
    lastName: "Raj",
    email: "Raj@gmail.com",
    password: "Raj@123",
  });

  try {
    await user.save();
    res.send("User created successfully...");
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

connectDB()
  .then(() => {
    console.log("DB connection made successfully...");
    app.listen(8888, () => {
      console.log("application started on port:8888 successfully");
    });
  })
  .catch((err) => {
    console.error("DB connection failed!!!!");
  });
```

### 7. Push Documents Using Postman

You can push documents by making POST requests to your `/signup` endpoint using Postman. Simply add the necessary JSON body and hit send.

### 8. Error Handling Using Try-Catch

Error handling is done using the `try` and `catch` block in the API, where any errors during the save operation will be caught and returned as a response.
