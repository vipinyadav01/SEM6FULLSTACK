const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Show create product form
router.get('/new', productController.showCreateForm);

// Create new product
router.post('/', productController.createProduct);

// Get single product
router.get('/:id', productController.getProduct);

// Show edit product form
router.get('/:id/edit', productController.showEditForm);

// Update product
router.put('/:id', productController.updateProduct);

// Show delete confirmation
router.get('/:id/delete', productController.showDeleteConfirmation);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;