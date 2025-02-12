const Product = require('../model/productSchema');

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

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        const message = req.query.message;
        res.render('index', {
            products,
            currentTime: new Date().toISOString(),
            user: 'vipinyadav01',
            message,
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).render('error', { message: 'Error loading products' });
    }
};

exports.getAddProductForm = (req, res) => {
    res.render('addProduct', {
        currentTime: new Date().toISOString(),
        user: 'vipinyadav01',
        errors: [],
        product: {}
    });
};

exports.addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newProduct = {
            name: name.trim(),
            price: parseFloat(price),
            description: description.trim(),
            createdAt: new Date().toISOString(),
            createdBy: 'vipinyadav01'
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

        const product = new Product(newProduct);
        await product.save();
        res.redirect('/?message=Product added successfully');
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).render('error', { message: 'Error adding product' });
    }
};

exports.getUpdateProductForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        res.render('updateProduct', {
            product,
            currentTime: new Date().toISOString(),
            user: 'vipinyadav01',
            errors: []
        });
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).render('error', { message: 'Error loading product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const updatedProduct = {
            name: name.trim(),
            price: parseFloat(price),
            description: description.trim(),
            updatedAt: new Date().toISOString(),
            updatedBy: 'vipinyadav01'
        };

        const errors = validateProduct(updatedProduct);
        if (errors.length > 0) {
            updatedProduct._id = req.params.id;
            return res.status(400).render('updateProduct', {
                errors,
                product: updatedProduct,
                currentTime: new Date().toISOString(),
                user: 'vipinyadav01'
            });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        res.redirect('/?message=Product updated successfully');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).render('error', { message: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        res.redirect('/?message=Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).render('error', { message: 'Error deleting product' });
    }
};
