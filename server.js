const express = require("express");
const {recivewebhook} = require("./controllers/webhookController")
const taskRoutes = require('./routes/task')
const addtoairtable = require('./routes/airtable')
const cors = require("cors"); 

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  console.log("trying ")
})

app.post("/receiveWebhook",recivewebhook );

app.use("/gettask", taskRoutes);
app.use("/airtable", addtoairtable);

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});