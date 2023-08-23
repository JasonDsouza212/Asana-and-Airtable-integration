const express = require("express");
const crypto = require("crypto");
const cors = require("cors"); 

// Initializes Express app.
const app = express();

// Parses JSON bodies.
app.use(express.json());
app.use(cors());

let secret = "";

app.get('/', (req, res) => {
  console.log("Connected to ngrok");
  res.sendStatus(200);
});

app.post("/receiveWebhook", (req, res) => {
  if (req.headers["x-hook-secret"]) {
    console.log("This is a new webhook");
    secret = req.headers["x-hook-secret"];

    res.setHeader("X-Hook-Secret", secret);
    res.sendStatus(200);
  } else if (req.headers["x-hook-signature"]) {
    console.log("trying to fetch the data")
    const computedSignature = crypto
      .createHmac("SHA256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(req.headers["x-hook-signature"]),
        Buffer.from(computedSignature)
      )
    ) {
      // Fail
      res.sendStatus(401);
    } else {
      // Success
      console.log(req.body)
      res.sendStatus(200);
      console.log(`Events on ${Date()}:`);
      console.log(req.body.events);
    }
  } else {
    console.error("Something went wrong!");
  }
});

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});