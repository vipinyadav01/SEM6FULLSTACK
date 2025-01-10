const express = require("express");
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get('/contact', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "contact.html"));
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
