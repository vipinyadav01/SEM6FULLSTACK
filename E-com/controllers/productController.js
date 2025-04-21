const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('showAllProducts', {
      title: 'All Products',
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      layout: 'layouts/main'
    });
  }
};

// Get single product with reviews
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('404', {
        title: 'Product Not Found',
        message: 'The requested product does not exist'
      });
    }

    res.render('showSingleProduct', {
      title: product.name,
      product,
      currentRating: product.rating?.toFixed(1) || 'N/A'
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to load product'
    });
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
    const newProduct = new Product({ name, description, price, category, stock, imageUrl });
    await newProduct.save();
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to create product'
    });
  }
};

// Show edit product form
exports.showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('404', {
        title: 'Product Not Found',
        message: 'Cannot edit a non-existent product'
      });
    }
    res.render('editProduct', { product });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to load edit form'
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, imageUrl },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).render('404', {
        title: 'Product Not Found',
        message: 'The requested product to update does not exist'
      });
    }
    res.redirect(`/products/${updatedProduct._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to update product'
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).render('404', {
        title: 'Product Not Found',
        message: 'Product could not be found for deletion'
      });
    }
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to delete product'
    });
  }
};

// Show delete confirmation
exports.showDeleteConfirmation = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('404', {
        title: 'Product Not Found',
        message: 'Cannot delete a non-existent product'
      });
    }
    res.render('deleteConfirmation', { product });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to load confirmation page'
    });
  }
};

// Add a product review with validation
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).render('404', {
        title: 'Product Not Found',
        message: 'The requested product does not exist'
      });
    }

    // Review Validation
    const errors = {};
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      errors.rating = 'Please select a valid rating between 1-5';
    }
    if (!comment || comment.trim().length < 10) {
      errors.comment = 'Review must be at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      return res.render('showSingleProduct', {
        title: product.name,
        product,
        error: 'Please fix the errors below',
        errors,
        review: req.body
      });
    }

    const review = {
      user: req.user?._id || null,
      name: req.user?.name || 'Anonymous',
      rating: Number(rating),
      comment: comment.trim()
    };

    product.reviews.push(review);
    product.calculateAverageRating();

    await product.save();
    res.redirect(`/products/${product._id}#reviews`);
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to add review'
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).render('404', {
        title: 'Product Not Found',
        message: 'Product not found'
      });
    }

    const review = product.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).render('404', {
        title: 'Review Not Found',
        message: 'Review not found'
      });
    }

    // Optional: Verify review ownership here

    product.reviews.pull(req.params.reviewId);
    product.calculateAverageRating();

    await product.save();
    res.redirect(`/products/${product._id}#reviews`);
  } catch (err) {
    console.error(err);
    res.status(500).render('500', {
      title: 'Server Error',
      message: 'Failed to delete review'
    });
  }
};

// Test layout route
exports.testLayout = (req, res) => {
  res.render('test', {
    title: 'Test Page',
    message: 'Layout is working!'
  });
};
