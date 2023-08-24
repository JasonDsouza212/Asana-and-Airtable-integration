const express = require('express')
const { gettask }= require("../controllers/taskController")
const router=express.Router();

router.get("/:taskid",gettask)

module.exports = router