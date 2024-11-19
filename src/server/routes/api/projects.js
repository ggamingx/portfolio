const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const projectsJSON = path.join(__dirname, "../../../database/projects.json")

function loadData() {
    try {
        const dataBuffer = fs.readFileSync(projectsJSON, 'utf8');
        const data = JSON.parse(dataBuffer);
        return data;
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return []; 
    }
}

router.get('/projects', async (req, res) => {
    res.json(loadData())
})

module.exports = router