const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../model/connectionRequest.js");
const User = require("../model/user.js");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    // main pupose --> get send data from user and save it in DB --> fromUserId, toUserId, status
    // steps
    // validate fields commming from user
    // save data in DB
    // think corner cases
    // check the toUserId user present in the DB or not. --> done
    // A can send connection to B | if connection request send, B can not send to A |  A canot send to himself

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

module.exports = requestRouter;
