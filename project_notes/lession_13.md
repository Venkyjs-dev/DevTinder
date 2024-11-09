# API Design and Development: Ref, Populate, and Thought Process

## Introduction

Before writing any API, it's essential to build a strong thought process. This ensures that the API logic is sound, handles edge cases, and produces efficient code. Each and every line of code plays a critical role in the application's performance and maintainability.

## Key Concepts

### 1. Thought Process for Writing an API

Before writing an API, follow these steps:

- **Understand the purpose**: Clearly define what the API is supposed to do.
- **Think through the logic**: Consider how the API will achieve its goal.
- **Consider all corner cases**: Identify potential edge cases and how to handle them.
- **Write the code**: Implement the logic after planning.

Building this thought process is essential for writing clean, maintainable, and efficient code. Every line matters.

### 2. Using `ref` in Mongoose to Create Relationships Between Collections

In MongoDB, relationships between collections can be established using references (`ref`). The `ref` attribute is added to a field in the schema, which points to another collection.

For example, in a `User` schema, you can reference a `Post` model like this:

Example 1:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});
```

Example 2:

```javascript
const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // here User represend the another collection itself
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["interested", "ignored", "rejected", "accepted"],
  },
});
```

### 3. Populating References with Mongoose

When you perform a query, you can use `populate` to fetch data from related collections based on the `ref` fields.

Example 1:

```javascript
const connectionRequiets = await connectionRequest
  .find({
    toUserId: loggedInUser._id,
    status: "interested",
  })
  .populate("fromUserId", ["firstName", "lastName", "skills", "about"]);
```

Example 2:

```javascript
const connectionRequiets = await connectionRequest
  .find({
    toUserId: loggedInUser._id,
    status: "interested",
  })
  .populate("fromUserId firstName lastName skills about");
```

Example 3:

```javascript
const connectionRequests = await connectionRequest
  .find({
    $or: [
      { fromUserId: loggedInUser._id, status: "accepted" },
      { toUserId: loggedInUser._id, status: "accepted" },
    ],
  })
  .populate("fromUserId", ["firstName", "lastName", "skills", "about"])
  .populate("toUserId", ["firstName", "lastName", "skills", "about"]);
```

### Homework Assignments

1.  **Thought Process for POST API vs GET API**

    - **POST API**: This is used to create or modify resources. It generally contains a request body and is used for actions like submitting forms, creating records, etc. A POST request often results in a change in the application's state.
    - **GET API**: This is used to retrieve information. GET requests are idempotent and safe, meaning they don't modify any data. They only fetch and display information.

    **Example**:

    - POST `/request/review` creates or updates a review.
    - GET `/user/requests/received` retrieves the list of received requests without altering any data.

2.  **Create GET `/user/requests/received` with All Checks**

    - **Explanation**: This API fetches all the requests received by the user. Ensure that the user is authenticated and authorized to fetch this data. Perform necessary checks to see if the user has any requests and handle scenarios where no requests are found.
    - Example:

      ```javascript
      userRouter.get("/user/requests/received", userAuth, async (req, res) => {
        try {
          const loggedInUser = req.user;

          const connectionRequiets = await connectionRequest
            .find({
              toUserId: loggedInUser._id,
              status: "interested",
            })
            .populate("fromUserId", [
              "firstName",
              "lastName",
              "skills",
              "about",
            ]);

          const data = connectionRequiets.map((row) => row.fromUserId);

          res.json({
            message: "data feachted succesfully",
            data: data,
          });
        } catch (e) {
          res.status(400).send("Error " + e.message);
        }
      });
      ```

3.  **Create GET `/user/connections` with All Checks**

    - **Explanation**: This API fetches all connections for a user. Like the previous example, ensure proper checks for user authentication and connection existence.
    - Example:

      ```javascript
      userRouter.get("/user/connections", userAuth, async (req, res) => {
        try {
          const loggedInUser = req.user;

          const connectionRequests = await connectionRequest
            .find({
              $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" },
              ],
            })
            .populate("fromUserId", [
              "firstName",
              "lastName",
              "skills",
              "about",
            ])
            .populate("toUserId", ["firstName", "lastName", "skills", "about"]);

          const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
              return row.toUserId;
            }
            return row.fromUserId;
          });

          res.json({
            message: "data featched succefully",
            data,
          });
        } catch (e) {
          res.status(400).send({
            message: "Something went wrongm" + e.message,
          });
        }
      });
      ```

## Conclusion

When designing APIs, it is critical to think through the entire process—what the API does, how it handles errors, and how different HTTP methods serve different purposes. Using Mongoose's `ref` and `populate`, we can manage relationships between collections and retrieve associated data easily.
