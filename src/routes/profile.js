const express = require("express");
const profileRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.send(user);
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const userInputData = req.body;

    if (userInputData.emailId || userInputData.password) {
      throw new Error("Can not edit email and password...");
    }
    Object.keys(userInputData).forEach((field) => {
      if (user[field]) {
        user[field] = userInputData[field];
      }
    });

    await user.save();
    res.send(`${user.firstName} has updated profile succesfully`);
  } catch (e) {
    res.status(400).send("Error " + e.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword && !newPassword) {
      throw new Error("Invalid passwords");
    }
    if (
      !validator.isStrongPassword(oldPassword) &&
      !validator.isStrongPassword(oldPassword)
    ) {
      throw new Error("please enter strong passwrod");
    }

    const isOldPasswordValid = await user.validateUserPassword(oldPassword);
    if (!isOldPasswordValid) {
      throw new Error("Invalid old password...");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;

    await user.save();

    res
      .status(201)
      .send(`${user.firstName}: your password is successfully updated...`);
  } catch (e) {
    throw new Error("Error: " + e.message);
  }
});

module.exports = profileRouter;
