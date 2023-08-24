const express = require('express')
const { addtask,getalltasks,edittask }= require("../controllers/airtableController")
const router=express.Router();

router.post("/addtask",addtask)
router.get("/alltasks",getalltasks)
router.put("/edittask",edittask)

module.exports = router 