const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./model/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json());

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
      res.send("Login successfull!!!");
    }
  } catch (e) {
    res.status(400).send("Error : " + e.message);
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
