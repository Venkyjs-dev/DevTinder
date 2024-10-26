const jwt = require("jsonwebtoken");
const User = require("../model/user");

const SECRET_KEY = "JAVASCRIPT@123";
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token!!!");
    }

    const decodedObj = jwt.verify(token, SECRET_KEY);
    const { _id } = decodedObj;

    if (!_id) {
      throw new Error("Invalid id!!!");
    }

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
};

module.exports = {
  userAuth,
};
