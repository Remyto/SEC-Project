const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");

const PORT = 4001;
// Store the comments in memory
// TODO: Store the posts in a database
const commentsByPostId = {};

const app = express();
app.unsubscribe(bodyParser.json);
app.use(cors()); // Set up CORS middleware

/// Routes
app.get("/posts/:id/comments", (req, res) => {
  /// Comment(s) on that post exist(s) ? send comment(s) : send []
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = crypto.randomBytes(4).toString("hex");
  const content = req.body;

  /// Comment(s) allready associated to this post ? array of comments : []
  const comments = commentsByPostId[req.params.id] || [];

  // By default a new comment is of status 'pending'
  comments.push({ id: commentId, content: content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  /// Create 'CommentCreated' event
  await axios.post(`http://localhost:4005/events`, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  // console.log("Event received",req.body.type);
  console.log("Event received", "CommentCreate");

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    // await axios.post("http://localhost:4005/events", {
    //   type: "CommentUpdated",
    //   data: {
    //     id,
    //     status,
    //     postId,
    //     content
    //   }
    // })
  }

  res.send({});
});

/// Listen
app.listen(PORT, () => {
  console.log(`comments listening on port ${PORT}`);
});
