const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.send(user);
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

module.exports = profileRouter;
