const express = require('express');
const app = express();
const db = require('./Database/db');
const port = 3000;

db.connect().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
});
