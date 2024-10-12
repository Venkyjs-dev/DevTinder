// import express
const express = require("express");

// create express instance
const app = express();

// This route path will match requests to /random.text
app.get("/random.text", (req, res) => {
  res.send("random.text");
});

// This route path will match acd and abcd.
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

// This route path will match abcd, abbcd, abbbcd, and so on.
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});

//This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get("/xy*zz", (req, res) => {
  res.send("xy*zz");
});

//This route path will match /abe and /abcde.
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});

// This route path will match anything with an “a” in it.
app.get("/a/", (req, res) => {
  res.send("/a/");
});

// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(".*fly$/", (req, res) => {
  res.send("/.*fly/");
});

// server listens at port 77777
app.listen(7777);
