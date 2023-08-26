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

const gettaskid = async()=>{
    const alltasks = await fetch(`${process.env.URL}/airtable/alltasks`);
    const ans = await alltasks.json();

    const matchingRecord = await ans.records.find(record => record.fields.Taskid === taskid);
    return matchingRecord;
}

async function deleteairtabletask(id) {
    const deletetask = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASEID}/${process.env.AIRTABLE_TABLEID}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
        }
    });
    return deletetask
}



module.exports = {
    addtaskapi,
    editedtask,
    gettaskid,
    deleteairtabletask
};
