const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.static('public'));
const productsFilePath = path.join(__dirname, 'products.json');
if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, JSON.stringify([], null, 2));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Current time: ${new Date().toISOString()}`);
    console.log(`Current user: vipinyadav01`);
});
