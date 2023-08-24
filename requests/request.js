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
            console.log("Added to DB successfully in Airtable:\n" + resp);
        } else {
            console.error("Error adding task:", taskadd.statusText);
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

 
const editedtask = async (requestBody) =>{
    await fetch(`${process.env.URL}/airtable/edittask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(requestBody),
      });
} 


module.exports={
    addtaskapi,
    editedtask
}