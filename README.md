<div id="header" align="center">
    <h1>🤝 Integration between Asana and Airtable 🔏 </h1>
    <h3><strong><em>An integration service that enables you to connect your Asana tasks with Airtable.</em></strong></h3>
  <img src="https://i.ytimg.com/vi/Mtk3xxgHF5M/maxresdefault.jpg" alt="home page of the website"><br>
    <!-- to change tagline if necessary -->
    </div> <br>

<h1> <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="25px"> Welcome to Integration between Asana and Airtable </h1>

# DEMO
[Video Demo](https://www.loom.com/share/151046f5092b495582d1356a08f31103?sid=93d6a8d3-22ea-43f8-b434-e39804adf5ac) Explains how the integration is working

 # 🎬 About

A service designed to seamlessly integrate your Asana tasks with Airtable, eliminating the need for manual copying. This service streamlines the synchronization of task data between the two platforms.

Built on the Node.js framework, this integration orchestrates a seamless connection between Asana and Airtable. The core function revolves around automatic data transfer: whenever a new task is generated in Asana, it is seamlessly copied to Airtable. The newly created Asana task is mirrored as a fresh entry within the "Task-Saver" table in Airtable. This table is meticulously structured to include essential columns:

- Task ID
- Name
- Assignee
- Due Date
- Description

This seamless coordination hinges on the activation of webhooks. The service promptly responds to specific webhook actions triggered by Asana, including **added**, **changed**, and **deleted** Additionally, the service is fortified to manage intricate scenarios like task editing, and even instances where data is deleted in Airtable. For instance, if a change action is detected in Airtable after a data deletion, the service intelligently reinserts the data into the table.

These functionalities collectively ensure a smooth and dependable integration between Asana and Airtable, empowering you to maintain accurate and up-to-date task records effortlessly. 

# 🎥 Features
- Copies the Asana task to Airtable
- Adds the task to Airtable
- Edits the task in Airtable
- Deletes the task in Airtable


# 🛠️ Tech Stack

This project uses: <br><br>

![NPM](https://img.shields.io/badge/npm-%2320232a.svg?style=for-the-badge&logo=npm&logoColor=%2361DAFB)
![ASANA](https://img.shields.io/badge/asana-%23646CFF.svg?style=for-the-badge&logo=asana&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![AIRTABLE](https://img.shields.io/badge/airtable-%2320232a.svg?style=for-the-badge&logo=airtable&logoColor=2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Prerequisites

Before installation, you need to have installed/knowledge of the following:
<br><br>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## 🤝 Contributing
### How to Run this project Locally

1. clone the **main** branch to your local machine
```markdown
git clone https://github.com/JasonDsouza212/Asana-and-Airtable-integration.git
```
2. change the present working directory

```markdown
cd Asana-and-Airtable-integration
```
3. Set the **.env** file with the value in the backend folder
- ASANA_ACCESS_TOKEN= **Add the Asana Access token here**
- WEBHOOK_SECRET=**Your MongoDB URL**
- AIRTABLE_ACCESS_TOKEN= **Add the Airtable Access token here**
- AIRTABLE_BASEID= **Add the Airtables BASEID**
- AIRTABLE_TABLEID=  **Add the Airtables Table ID**
- URL= **Add this app's hosted url, if you are testing that con be set to localhost:3000 / use ngrok to make the url publiclaly available and add that url**


4. Open CMD in your current directory and install npm packages using command:

```markdown
npm install
```

5. Run it locally using

```
npm start
```
6. Esatblish the [webhook](https://developers.asana.com/docs/webhooks-guide) in Asana first inorder to sync the Airtable with Asana 

7. Now the app is ready to take the webhook actions


<br>

