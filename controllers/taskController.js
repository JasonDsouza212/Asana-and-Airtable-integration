const gettask = async (req, res) => {
    try {
      const taskId = req.params.taskid; 
  
      const response = await fetch(`https://app.asana.com/api/1.0/tasks/${taskId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ASANA_ACCESS_TOKEN}`
        }
      });
  
      if (response.ok) {
        const taskData = await response.json();
        return res.json(taskData); 
      } else {
        console.error("Error fetching task:", response.statusText);
        res.status(response.status).send("Error fetching task");
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).send("Error fetching task");
    }
  }


module.exports={
    gettask
}