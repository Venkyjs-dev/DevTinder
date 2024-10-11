// import express
const express = require("express");

// create express instance
const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  // handle logic to send data from db to client
  res.send({ firstName: "Venky", lastName: "Raj" });
});

// This will only handle POST call to /user
app.post("/user", (req, res) => {
  // handle logic to store data in DB
  res.send("data saved successfully");
});

// This will only handle PUT call to /user
app.put("/user", (req, res) => {
  // handle logic to update the user in DB
  res.send("data updates successfully");
});

// This will only handle PATCH call to /user
app.patch("/user", (req, res) => {
  // handle logic to patch
  res.send("patch updated successfully");
});

// This will only handle DELETE call to /user
app.delete("/user", (req, res) => {
  // handle delete logic
  res.send("user deleted succefully");
});
// server listens at port 77777
app.listen(7777);
