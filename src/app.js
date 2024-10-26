const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./model/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { userAuth } = require("./middlewares/auth.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
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
    const userInputPassword = password;
    const isPasswordValid = await user.validateUserPassword(userInputPassword);

    if (!isPasswordValid) {
      throw new Error("Invalid creditentials");
    } else {
      const jwtToken = await user.getJWT();

      res.cookie("token", jwtToken, { expires: new Date(Date.now() + 900000) });
      res.send("Login successfull!!!");
    }
  } catch (e) {
    res.status(400).send("Error : " + e.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.send(user);
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

app.post("/sendConnectionReqest", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user.firstName + " Send the connection request...");
  } catch (e) {
    res.status(400).send("Error: " + e.message);
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
