const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const productRoutes = require("./routes/productRoutes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
