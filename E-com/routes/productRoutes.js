const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Show test layout
router.get('/test', productController.testLayout);

// Show create product form - should come before any dynamic routes
router.get('/new', productController.showCreateForm);

// Create new product
router.post('/', productController.createProduct);

// Show delete confirmation - placed before single product to avoid conflict
router.get('/:id/delete', productController.showDeleteConfirmation);

// Show edit product form
router.get('/:id/edit', productController.showEditForm);

// Get all products
router.get('/', productController.getAllProducts);

// Get single product (should come after all static routes)
router.get('/:id', productController.getProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

// Add review to product
router.post('/:id/reviews', productController.addReview);

// Delete review
router.delete('/:productId/reviews/:reviewId', productController.deleteReview);



module.exports = router;
