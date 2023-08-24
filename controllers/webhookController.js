const crypto = require("crypto");
const { addtaskapi,editedtask } = require('../requests/request');
require('dotenv').config();


let secret = process.env.WEBHOOK_SECRET;
let isProcessing = false;


const recivewebhook = async(req, res) =>{
  if(isProcessing==false){

    isProcessing=true
    if (req.headers["x-hook-secret"]) {
      // runs when new webhook is created 
      secret = req.headers["x-hook-secret"];
      console.log(secret + "  this is scecret ")
  
      res.setHeader("X-Hook-Secret", secret);
      res.sendStatus(200);
      return 

    } else if (req.headers["x-hook-signature"]) {
      console.log("inside")
      // runs when the webhook is triggered 
      const computedSignature = crypto
        .createHmac("SHA256", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");
  
      if (
        !crypto.timingSafeEqual(
          Buffer.from(req.headers["x-hook-signature"]),
          Buffer.from(computedSignature)
        )) {
        // Fail
        res.sendStatus(401);

      } else {
        // Success
        res.sendStatus(200);
        console.log(`Events on ${Date()}:`);
        const taskid = req.body.events[0].resource.gid; 
        // console.log(taskid)
        const typ = req.body.events[0].action;
        // console.log(typ)
        
        // Fetching the task data from asana as it doesnt provide the data 
        const task = async () => {
          if(typ!="deleted"){
            try { 
              const fetchResponse = await fetch(`${process.env.URL}/gettask/${taskid}`);
              const taskData = await fetchResponse.json();
              // console.log("This is the task data===================" + taskData)
              return taskData
            } catch (error) {
              console.error("Error fetching task:", error);
            }
          }
        };
  
        const taskdata = await task();
        // saving all the data I need to store it on airtable 
        let requestBody={};
          if(typ == "added" || typ == "changed" ){ 
            if(taskdata==undefined){
              return
            }
             requestBody = { 
              Deadline: taskdata.data.due_on ?taskdata.data.due_on: "No Deadline specified" ,
              Name: taskdata.data.name?taskdata.data.name: "",
              Assignee: taskdata.data.assignee?taskdata.data.assignee.name:"",
              Description: taskdata.data.notes?taskdata.data.notes:"",
              Taskid: taskid
          }
          }

        // determining what type of action is made because when it new we need to add it ,if it already exists then we need to edit it
        if(typ=="added"){
          addtaskapi(requestBody)
          // res.sendStatus(200);
        }else if(typ=="changed"){
            const alltasks = await fetch(`${process.env.URL}/airtable/alltasks`);
            const ans = await alltasks.json();

            const matchingRecord = ans.records.find(record => record.fields.Taskid === taskid);
            if(!matchingRecord){
              // if there is any error while adding the task to airtable then it will be added here 
              addtaskapi(requestBody)
              isProcessing=false
              return
            }
            const editid = matchingRecord.id;
            requestBody.airtaskid =editid
            // making edit reuest 
            editedtask(requestBody)
        }else if(typ=="deleted"){
          console.log("in delete")
          const alltasks = await fetch(`${process.env.URL}/airtable/alltasks`);
          const ans = await alltasks.json();

          const matchingRecord = ans.records.find(record => record.fields.Taskid === taskid);
          if(!matchingRecord){
            // if there is any error while adding the task to airtable then it will be added here 
            console.log("no data found on Airtable with the specified id")
            isProcessing=false
            return
          }
          const deletetask = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASEID}/${process.env.AIRTABLE_TABLEID}/${matchingRecord.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
            });

            if (deletetask.ok) {
                console.log("Task deleted successfully.");
            } else {
                console.error("Error deleting task:");
            }
        }
      
      }
    } else {
      console.error("Something went wrong!");
    }
  }
  isProcessing=false
    
}

module.exports={
    recivewebhook
}