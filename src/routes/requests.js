const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../model/connectionRequest.js");
const User = require("../model/user.js");
const mongoose = require("mongoose");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const toUser = await User.findById({ _id: toUserId });

      if (!toUser) {
        throw new Error("to user does not exist");
      }

      const isDuplicatConnection = await ConnectionRequest.find({
        fromUserId: toUserId,
        toUserId: fromUserId,
      });
      console.log(isDuplicatConnection);

      if (isDuplicatConnection.length != 0 || !isDuplicatConnection) {
        throw new Error("Connection request alrady made");
      }

      if (fromUserId.equals(toUserId)) {
        throw new Error("Can not send request to himself");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.send(`${req.user.firstName} ${status} ${toUser.firstName}`);
    } catch (e) {
      res.status(400).send("Error: " + e.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          messsage: "Invalid status",
        });
      }

      const loggedInUserId = loggedInUser._id;

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      });

      console.log(connectionRequest, "connectionRequest -->");

      if (!connectionRequest) {
        return res.status(401).json({
          message: "Connection request not found",
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.status(200).json({
        message: `Connection request ${status}`,
        data,
      });
    } catch (e) {
      res.status(400).send("Error: " + e.message);
    }
  }
);

module.exports = requestRouter;
