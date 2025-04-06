const express = require('express');
const router = express.Router();


//GET, POST, PUT, PATCH, DELETE

//1. show all product in database - GET
router.get('/products', (req, res) => {
    res.send('All products');
})
//2. show single product on a page - GET
router.get('/product/single/:id', (req, res) => {
    res.send('Single product');


})
//3. show add product form page - GET
router.get('/product/add', (req, res) => {
    res.send('Add product');
    res.render('/views/products/addProduct.ejs', { title: 'Add Product' });
})

//4. creation of product from form data - POST
router.post('', (req, res) => {

})
//5. show update product form page - GET
router.get('/product/edit', (req, res) => {
    res.send('Edit product');
    res.render('/views/products/editProduct.ejs', {
        title: 'Edit Product'
    });
});
//6. update product from form data - PUT
router.put('', (req, res) => {
    res.send('Update product');
    res.render

})
//7. delete product - DELETE
router.delete('/product/delete/:id', (req, res) => {

})

module.exports = router;
