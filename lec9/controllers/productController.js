const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../database/products.json");

// Ensure the database folder and file exist
if (!fs.existsSync(path.dirname(dataFilePath))) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
}
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, "[]");
}

// Load products from JSON
const loadProducts = () => {
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
};

// Save products to JSON
const saveProducts = (products) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
};

// Show all products
exports.getAllProducts = (req, res) => {
    const products = loadProducts();
    res.render("index", { products });
};

// Add a new product
exports.addProduct = (req, res) => {
    let products = loadProducts();
    const { name, price } = req.body;
    const newProduct = { id: Date.now(), name, price };
    products.push(newProduct);
    saveProducts(products);
    res.redirect("/");
};

// Delete product
exports.deleteProduct = (req, res) => {
    let products = loadProducts();
    products = products.filter((p) => p.id !== parseInt(req.params.id));
    saveProducts(products);
    res.redirect("/");
};

// Show update form
exports.getUpdateForm = (req, res) => {
    const products = loadProducts();
    const product = products.find((p) => p.id === parseInt(req.params.id));
    res.render("updateProduct", { product });
};

// Update product
exports.updateProduct = (req, res) => {
    let products = loadProducts();
    const { name, price } = req.body;
    products = products.map((p) =>
        p.id === parseInt(req.params.id) ? { ...p, name, price } : p
    );
    saveProducts(products);
    res.redirect("/");
};
