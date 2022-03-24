const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const PORT = 4001;
// Store the comments in memory
// TODO: Store the posts in a database
const commentsByPostId = {};

const app = express();
app.unsubscribe(bodyParser.json);

/// Routes
app.get("/posts/:id/comments", (req, res) => {
  /// Comment(s) on that post exist(s) ? send comment(s) : send []
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = crypto.randomBytes(4).toString("hex");
  const content = req.body;

  /// Comment(s) allready associated to this post ? array of comments : []
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content: content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

/// Listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
