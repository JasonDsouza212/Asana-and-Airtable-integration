const addtaskapi = async (requestBody) => {
    try {
        const taskadd = await fetch(`${process.env.URL}/airtable/addtask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (taskadd.ok) {
            const ans = await taskadd.json();
            const resp = JSON.stringify(ans);
            console.log("Added to DB successfully in Airtable:");
        } else {
            console.error("Error adding task:", taskadd.statusText);
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

const editedtask = async (requestBody) => {
    await fetch(`${process.env.URL}/airtable/edittask`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
    });
}

const taskid = async()=>{
    const alltasks = await fetch(`${process.env.URL}/airtable/alltasks`);
    const ans = await alltasks.json();

    const matchingRecord = await ans.records.find(record => record.fields.Taskid === taskid);
    return matchingRecord;
}

module.exports = {
    addtaskapi,
    editedtask,
    taskid
};
