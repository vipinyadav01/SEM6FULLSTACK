const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Connect to MongoDB Atlas
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', productRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Current time: ${new Date().toISOString()}`);
});
