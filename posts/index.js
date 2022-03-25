const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { access } = require("fs");

const PORT = 4000;
// Store the posts in memory
// TODO: Store the posts in a database
const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Set up CORS middleware

/// Routes
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const title = req.body;

  /// Create the post
  posts[id] = {
    id,
    title,
  };

  /// Add body parser to confirm user JSON is parsed

  /// Confirm the posts has been created
  res.status(201).send(posts[id]);
});

/// Listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
