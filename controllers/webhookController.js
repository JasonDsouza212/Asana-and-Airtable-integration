const crypto = require("crypto");
const { addtaskapi, editedtask, gettaskid, deleteairtabletask , fetchasanatask} = require('../requests/request');
require('dotenv').config();

let secret = process.env.WEBHOOK_SECRET;
let isProcessing = false;

const recivewebhook = async (req, res) => {
    if (isProcessing === false) {
       
        if (req.headers["x-hook-secret"]) {
            // Runs when a new webhook is created
            secret = req.headers["x-hook-secret"];
            console.log(secret + " this is secret ");

            res.setHeader("X-Hook-Secret", secret);
            res.sendStatus(200);
            return;
        } else if (req.headers["x-hook-signature"]) {
            isProcessing = true;
            // Runs when the webhook is triggered
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
                res.sendStatus(200); 
                console.log(`Events on ${Date()}:`);
                const taskid = req.body.events[0].resource.gid;
                let typ = req.body.events[0].action;

                const taskdata = await fetchasanatask(taskid , typ);
                // Saving all the data I need to store it on Airtable
                let requestBody ;
                if (typ == "added" || typ == "changed") {
                    if (taskdata != undefined) {
                        requestBody = {
                            Deadline: taskdata.data.due_on ? taskdata.data.due_on : "No Deadline specified",
                            Name: taskdata.data.name ? taskdata.data.name : "",
                            Assignee: taskdata.data.assignee ? taskdata.data.assignee.name : "",
                            Description: taskdata.data.notes ? taskdata.data.notes : "",
                            Taskid: taskid
                        };
                    }                   
                }

                const matchingRecord= await gettaskid(taskid)
                if(typ!="deleted" && matchingRecord!=undefined) {
                    typ="changed";
                }

                switch (typ) {
                    case "added":
                      addtaskapi(requestBody);
                      break;
                  
                    case "changed":
                        // if the edit is done and suudenly its deleted
                        if(requestBody==undefined) {
                            isProcessing = false;
                            return;
                        }

                        if (matchingRecord == undefined) {
                        // If there is any error while adding the task to Airtable then it will be added here
                        addtaskapi(requestBody);
                        isProcessing = false;
                        return;
                        }

                        const editid = matchingRecord.id;
                        requestBody.airtaskid = editid;
                        // Making edit request
                        await editedtask(requestBody);
                        console.log("Data edited successfully")
                        
                        break;
                  
                    case "deleted":
                      // const matchingRecord= await gettaskid(taskid) 
                      if (!matchingRecord) {
                        // If there is any error while adding the task to Airtable then it will be added here
                        console.log("no data found on Airtable with the specified id");
                        isProcessing = false;
                        return;
                      }
                      const deletetask = await deleteairtabletask(matchingRecord.id);
                  
                      if (deletetask.ok) {
                        console.log("Task deleted successfully from Airtable");
                      } else {
                        console.error("Error deleting task:");
                      }
                      break;
                  
                    default:
                      console.log("Unknown action:", typ);
                  }                  
            }  
        } else {
            console.error("Something went wrong!");
        }
    }
    isProcessing = false;
};

module.exports = {
    recivewebhook
};
