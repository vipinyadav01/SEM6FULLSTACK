import express from 'express';
import dbConnect from './database/db.js';
import productRoutes from './routes/productRoutes.js';
import ejsMate from 'ejs-mate';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

dbConnect();

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.set('views/products', path.join(__dirname, 'views'));
app.use(productRoutes);
app.listen(6000, () => {
    console.log("server is running at port 6000")
})
