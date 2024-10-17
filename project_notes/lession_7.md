# Notes on Express and Mongoose APIs

## JS Object vs JSON

JavaScript objects are mutable data structures used for storing collections of data and more complex entities. JSON (JavaScript Object Notation) is a lightweight format for data interchange, easily readable by humans and machines.

## Add the express.json middleware to your app

To enable your Express application to parse JSON requests, add the following middleware:

```javascript
app.use(express.json());
```

## API - Get user by ID

This API should retrieve user details based on the user's ID. (Implementation needed)

## Difference between PATCH and PUT

`PATCH` is used for partial updates to a resource, while `PUT` is used to replace an entire resource. If using `PATCH`, only specified fields are updated; if using `PUT`, the entire resource must be sent.

## Explore the Mongoose Documentation for Model methods

Mongoose provides various model methods such as `find()`, `findOne()`, `updateOne()`, and `deleteOne()`, which simplify database interactions and data handling.

## What are options in a Model.findOneAndUpdate method

The `findOneAndUpdate` method allows you to find a document and update it atomically. Options include `new` (return the updated document), `upsert` (create a new document if no match is found), and `runValidators` (enforce validation rules during updates).

## User.findOne with duplicate email ids, which object returned

When using `User.findOne()` with duplicate email IDs, it returns the first user object found that matches the query.

## Make your signup API dynamic to receive data from the end user

The signup API allows users to create an account by sending their data to the server.

```javascript
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User created successfully...");
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});
```

## API - Get user by email

This API fetches user details based on the provided email ID.

```javascript
app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const emailId = req.body;
    const users = await User.find(emailId);
    if (users.length === 0) {
      res.status(401).send("User not found!!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(401).send("User not found!!!");
  }
});
```

## API - Feed API - GET /feed - get all the users from the database

This API retrieves all users from the database.

```javascript
app.use(express.json());

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(401).send("Users not found!!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(401).send("Something went wrong!!!");
  }
});
```

## API - Delete a user

This API deletes a user based on the provided email ID.

```javascript
app.use(express.json());

app.delete("/user", async (req, res) => {
  try {
    const emailId = req.body;
    const result = await User.deleteOne(emailId);

    if (result.deletedCount === 0) {
      res.status(404).send("User not found or no deleted");
    } else {
      res.status(200).send("User deleted...");
    }
  } catch (e) {
    res.status(500).send("Error Deleting user");
  }
});
```

## API - Update a user

This API updates a user based on the provided email ID and updates fields.

```javascript
app.use(express.json());

app.patch("/user", async (req, res) => {
  try {
    const { emailId, ...updates } = req.body;
    const result = await User.updateOne({ emailId: emailId }, updates);

    if (result.modifiedCount === 0) {
      res.status(404).send("User not found or no changes made");
    }

    res.status(200).send("User updated successfully");
  } catch (e) {
    res.status(500).send("Error updating user");
  }
});
```

## API - Update the user with email ID

This API updates user information based on the email ID.

```javascript
app.use(express.json());

app.patch("/user", async (req, res) => {
  try {
    const { emailId, ...updates } = req.body;
    const result = await User.updateOne({ emailId: emailId }, updates);

    if (result.modifiedCount === 0) {
      res.status(404).send("User not found or no changes made");
    }

    res.status(200).send("User updated successfully");
  } catch (e) {
    res.status(500).send("Error updating user");
  }
});
```
