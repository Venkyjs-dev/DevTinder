const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./model/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

// authentication step 1: install cookie-parser package
const cookieParser = require("cookie-parser");

// authentication step 2: install jsonwebtoken package
const jwt = require("jsonwebtoken");

app.use(express.json());

// authentication step 3: add cookieParser middle to all the requests
app.use(cookieParser());

app.post("/singup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    // validate req.body
    validateSignUpData(req);

    // encrypt password using bcrypt package
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully...");
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(400)
        .send("Email ID already exists. Please use a different email.");
    } else {
      res.status(400).send(`Error : ${err.message}`);
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid creditinals");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid creditials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid creditentials");
    } else {
      // authentication step 4: create jwt token, by passing id info and secreat key
      const _id = user._id;
      const jwtToken = jwt.sign({ _id: _id }, "JAVASCRIPT@123");

      // authentication step 5: put the token in cookie and send to client
      res.cookie("token", jwtToken);
      res.send("Login successfull!!!");
    }
  } catch (e) {
    res.status(400).send("Error : " + e.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    // authentication step 6: receive the cookie from client, when client hit the API
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!!!");
    }

    // authentication step 7: verify the received token, is it correct or not using jwt.verify method
    const decoded = jwt.verify(token, "JAVASCRIPT@123");

    // authentication step 8: take the info: id from the decoded, then write a query and send the requested data to client;
    const id = decoded._id;
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found!!!");
    }

    res.send(user);
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(401).send("Users not found!!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(401).send("something went wrong!!!");
  }
});

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

app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOW_UPDATE = ["skills", "about", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOW_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skill should be less than 10");
    }
    const result = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });

    if (result.modifiedCount === 0) {
      res.status(404).send("User not found or no changes made");
    } else {
      res.status(200).send("User updated successfully");
    }
  } catch (e) {
    res.status(500).send(`Error updating user: ${e.message}`);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const emailId = req.body;
    const result = await User.deleteOne(emailId);

    if (result.deletedCount === 0) {
      res.status(404).send("User not found or no deleted ");
    } else {
      res.status(200).send("user deleted...");
    }
  } catch (e) {
    res.status(500).send("Error Deleting user");
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
    console.error("DB conncetion failed!!!!");
  });
