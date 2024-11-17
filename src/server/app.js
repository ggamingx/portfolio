const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const port = 3000;

app.use(express.static(path.join(__dirname, '../public')))

app.listen(port, "0.0.0.0", () => {
    console.log(`server is running on ${port}`)
})

module.exports = app;