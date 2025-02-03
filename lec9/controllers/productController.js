const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../products.json');
const createProductsFileIfNotExists = () => {
    if (!fs.existsSync(productsFilePath)) {
        fs.writeFileSync(productsFilePath, JSON.stringify([], null, 2));
    }
};

const getProducts = () => {
    createProductsFileIfNotExists();
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products:', error);
        return [];
    }
};

const saveProducts = (products) => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving products:', error);
        return false;
    }
};

const validateProduct = (product) => {
    const errors = [];
    if (!product.name || product.name.trim().length === 0) {
        errors.push('Name is required');
    }
    if (!product.price || isNaN(product.price) || product.price <= 0) {
        errors.push('Valid price is required');
    }
    if (!product.description || product.description.trim().length === 0) {
        errors.push('Description is required');
    }
    return errors;
};
exports.getAllProducts = (req, res) => {
    try {
        const products = getProducts();
        res.render('index', {
            products,
            currentTime: new Date().toISOString(),
            user: 'vipinyadav01'
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).render('error', { message: 'Error loading products' });
    }
};

exports.getAddProductForm = (req, res) => {
    res.render('addProduct', {
        currentTime: new Date().toISOString(),
        user: 'vipinyadav01'
    });
};

exports.addProduct = (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newProduct = {
            name: name.trim(),
            price: parseFloat(price),
            description: description.trim()
        };

        const errors = validateProduct(newProduct);
        if (errors.length > 0) {
            return res.status(400).render('addProduct', {
                errors,
                product: newProduct,
                currentTime: new Date().toISOString(),
                user: 'vipinyadav01'
            });
        }

        const products = getProducts();
        newProduct.id = Date.now();
        newProduct.createdAt = new Date().toISOString();
        newProduct.createdBy = 'vipinyadav01';

        products.push(newProduct);

        if (saveProducts(products)) {
            res.redirect('/');
        } else {
            throw new Error('Failed to save product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).render('error', { message: 'Error adding product' });
    }
};

exports.getUpdateProductForm = (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const products = getProducts();
        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        res.render('updateProduct', {
            product,
            currentTime: new Date().toISOString(),
            user: 'vipinyadav01'
        });
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).render('error', { message: 'Error loading product' });
    }
};

exports.updateProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { name, price, description } = req.body;

        const updatedProduct = {
            id: productId,
            name: name.trim(),
            price: parseFloat(price),
            description: description.trim()
        };

        const errors = validateProduct(updatedProduct);
        if (errors.length > 0) {
            return res.status(400).render('updateProduct', {
                errors,
                product: updatedProduct,
                currentTime: new Date().toISOString(),
                user: 'vipinyadav01'
            });
        }

        const products = getProducts();
        const index = products.findIndex(p => p.id === productId);

        if (index === -1) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        updatedProduct.updatedAt = new Date().toISOString();
        updatedProduct.updatedBy = 'vipinyadav01';
        updatedProduct.createdAt = products[index].createdAt;
        updatedProduct.createdBy = products[index].createdBy;

        products[index] = updatedProduct;

        if (saveProducts(products)) {
            res.redirect('/');
        } else {
            throw new Error('Failed to update product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).render('error', { message: 'Error updating product' });
    }
};

exports.deleteProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        let products = getProducts();

        const productExists = products.some(p => p.id === productId);
        if (!productExists) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        products = products.filter(p => p.id !== productId);

        if (saveProducts(products)) {
            res.redirect('/');
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).render('error', { message: 'Error deleting product' });
    }
};
