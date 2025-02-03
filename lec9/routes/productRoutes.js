const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
router.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});
router.get('/', productController.getAllProducts);
router.get('/add', productController.getAddProductForm);
router.post('/add', productController.addProduct);
router.get('/update/:id', productController.getUpdateProductForm);
router.post('/update/:id', productController.updateProduct);
router.get('/delete/:id', productController.deleteProduct);
router.use((err, req, res, next) => {
    console.error('Route error:', err);
    res.status(500).render('error', {
        message: 'An error occurred',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});
module.exports = router;
