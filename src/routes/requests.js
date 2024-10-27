const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

requestRouter.post("/sendConnectionReqest", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user.firstName + " Send the connection request...");
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});

module.exports = requestRouter;
