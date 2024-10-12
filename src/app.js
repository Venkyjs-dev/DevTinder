// import express
const express = require("express");

// create express instance
const app = express();

// This route path will match requests to /random.text
app.get("/random.text", (req, res) => {
  res.send("random.text");
});

// url: http://localhost:3000/users/34/books/8989
app.get("/users/:userId/books/:bookId", (req, res) => {
  console.log(req.params);
  res.send(req.params); // { "userId": "34", "bookId": "8989" }
});

// url: http://localhost:3000/flights/mumbai-banglore
app.get("/flights/:from-:to", (req, res) => {
  res.send(req.params); // { "from": "mumbai", "to": "banglore" }
});

// url: http://localhost:3000/plantae/Prunus.persica
app.get("/plantae/:genus.:species", (req, res) => {
  res.send(req.params); // { "genus": "Prunus", "species": "persica" }
});

// server listens at port 77777
app.listen(8888);
