const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./model/user.js");

app.post("/singup", async (req, res) => {
  try {
    const user = new User({
      firstName: "Rakesh",
      lastName: "Raj",
      email: "Raj@gmail.com",
      password: "Raj@123",
    });

    await user.save();
    res.send("User created successfully...");
  } catch (err) {
    res.send("Something went wrong!!!");
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
