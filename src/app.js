const express = require("express");
const connectDB = require("./config/database.js");

const app = express();

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
