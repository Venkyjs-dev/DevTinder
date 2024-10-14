// import express
const express = require("express");

// create express instance
const app = express();

// error handling using try and catch
app.get("/user", (req, res) => {
  try {
    throw new Error("sampe error");
    res.send("user handler!!!");
  } catch (e) {
    res.status(500).send("something went wrong!!");
  }
});

// erro handling using app.use() and err object
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong!!");
  }
});
// server listens at port 77777
app.listen(8888);
