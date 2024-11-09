const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../model/connectionRequest");

// get the all connections, toUserId should be logged in userId and status should be interested
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequiets = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName", "skills", "about"]);

    const data = connectionRequiets.map((row) => row.fromUserId);

    res.json({
      message: "data feachted succesfully",
      data: data,
    });
  } catch (e) {
    res.status(400).send("Error " + e.message);
  }
});

// get all the connection ==> status is accepted and loggedInuserId can be toUserid or from userid
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
      .populate("fromUserId", ["firstName", "lastName", "skills", "about"])
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

module.exports = userRouter;
