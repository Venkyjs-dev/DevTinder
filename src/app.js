// import express
const express = require("express");

// create express instance
const app = express();

// create request handler using app.use --> here, callback function, which takes req, res is request handler.
app.use("/test", (req, res) => {
  res.send("This is test ");
});

// when the /hello world route hits, then it will return the response
app.use("/hello", (req, res) => {
  res.send("This is hello ");
});

app.use("/word", (req, res) => {
  res.send("This is test my worlds");
});

// server listens at port 77777
app.listen(7777);
