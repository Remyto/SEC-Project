const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

/// Watch for event

const PORT = 4003;

const app = express();
app.use(bodyParser.json());

/// Routes
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.include("orange") ? "rejected" : "approuved";

    console.log("status = ", status);

    await axios.post("http://locahost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status: status,
        content: data.content,
      },
    });
  }

  res.send({});
});

/// Listen
app.listen(PORT, () => {
  console.log(`moderation listening on port ${PORT}`);
});
