const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { access } = require("fs");
const axios = require("axios");

const PORT = 4000;
// Store the posts in memory
// TODO: Store the posts in a database
const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Set up CORS middleware

/// Routes
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const title = req.body;

  /// Create the post
  posts[id] = {
    id,
    title,
  };

  /// Make async post request to event-bus
  await axios.post(`http://localhost:4005/events`, {
    type: "PostCreated",
    data: { id, title },
  });

  /// Add body parser to confirm user JSON is parsed

  /// Confirm the posts has been created
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("received event", req.body.type)

  res.send({})
})

/// Listen
app.listen(PORT, () => {
  console.log(`posts listening on port ${PORT}`);
});