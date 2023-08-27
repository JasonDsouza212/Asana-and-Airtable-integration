const addtask = async (req, res) => {
    try {
        const { Name, Assignee, Description, Taskid, Deadline } = req.body;

        const requestBody = {
            records: [
                {
                    fields: {
                        Deadline,
                        Name,
                        Assignee,
                        Description,
                        Taskid
                    }
                }
            ]
        };

        const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASEID}/${process.env.AIRTABLE_TABLEID}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(requestBody) 
        });

        if (response.ok) {
            const taskData = await response.json();
            return res.json(taskData);
        } else {
            console.error("Error adding task:", response.statusText);
            res.status(response.status).send("Error adding task");
        }
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Error adding task");
    }
};

const edittask = async (req, res) => {
    try {
        const { Name, Assignee, Description, Taskid, Deadline, airtaskid } = req.body;

        const requestBody = {
            "fields": {
                "Deadline": Deadline,
                "Name": Name,
                "Assignee": Assignee,
                "Description": Description,
                "Taskid": Taskid
            }
        };

        const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASEID}/${process.env.AIRTABLE_TABLEID}/${airtaskid}`, {
            method: "PUT", 
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(requestBody) 
        });

        if (response.ok) {
            const taskData = await response.json();
            return res.json(taskData);
        } else {
            console.error("Error editing task:", response.statusText);
            res.status(response.status).send("Error editing task");
        }
    } catch (error) {
        console.error("Error editing task:", error);
        res.status(500).send("Error editing task");
    }
};

const getalltasks = async (req, res) => {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASEID}/${process.env.AIRTABLE_TABLEID}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`
            }
        });

        if (response.ok) {
            const taskData = await response.json();
            return res.json(taskData); 
        } else {
            console.log("Error fetching tasks:");
            res.status(response.status).send("Error fetching tasks");
        }
    } catch (error) {
        console.log("Error fetching tasks:");
        res.status(500).send("Error fetching tasks");
    }
};

module.exports = {
    addtask,
    getalltasks,
    edittask
};
