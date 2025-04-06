const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('showAllProducts', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('showSingleProduct', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Show create product form
exports.showCreateForm = (req, res) => {
  res.render('createProduct');
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });
    await newProduct.save();
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Show edit product form
exports.showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('editProduct', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        stock,
        imageUrl
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.redirect(`/products/${updatedProduct._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Show delete confirmation
exports.showDeleteConfirmation = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('deleteConfirmation', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};