const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = 4005;

const app = express();
app.use(bodyParser.json()); // Add body-parser JSON middleware

app.post("/events", (req, res) => {
  const event = req.body;

  // Make post requests to other services, passing event as data
  axios.post(`http://posts-clusterip-srv:4000/events`, event);
  axios.post(`http://comments-srv:4001/events`, event);
  //axios.post(`http://localhost:4002/events`, event);

  res.send({ status: "OK" });
});

// Listen
app.listen(PORT, () => {
  console.log(`event-bus istening on port ${PORT}`);
});
