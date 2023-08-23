const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

let secret = ""; // This is where you'll store the secret during the handshake

app.get('/', (req, res) => {
  console.log("Connected to ngrok");
  res.sendStatus(200);
});

app.post("/receiveWebhook", (req, res) => {
  console.log("Webhook received "+ req.body);

  if (req.headers["x-hook-signature"]) {
    // During the handshake, check if it's a new webhook and store the secret
    if (req.headers["x-hook-signature"] === "new-webhook") {
      secret = req.body["secret"];
      console.log("Received new webhook secret:", secret);
      res.sendStatus(200);
    } else {
      const computedSignature = crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");

      if (req.headers["x-hook-signature"] === computedSignature) {
        console.log("Webhook signature verified");
        res.sendStatus(200);
        console.log(`Events on ${Date()}:`);
        console.log(req.body.events);
      } else {
        console.log("Webhook signature verification failed");
        res.sendStatus(401);
      }
    }
  } else {
    console.error("No x-hook-signature header found in request");
    res.sendStatus(400);
  }
});

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});
