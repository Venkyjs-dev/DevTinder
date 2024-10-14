// import express
const express = require("express");

// create express instance
const app = express();

const { adminAuth } = require("./middlewares/adminAuth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("sent all data to admin!!");
});

app.post("/admin/deleteUser", (req, res) => {
  res.send("user deleted successfully!!!");
});
// server listens at port 77777
app.listen(8888);
