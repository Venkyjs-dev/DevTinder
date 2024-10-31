const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("../model/user.js");
const validator = require("validator");
const jwt = require("jsonwebtoken");

authRouter.post("/singup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("loggedOut successfylly.....");
});

module.exports = authRouter;
