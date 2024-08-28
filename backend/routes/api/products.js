const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

router.get('/collections/:type', productController.getProductsByCollection);
router.get('/search', productController.getProductsBySearch);
router.get('/filter/price', productController.getProductsByPrice);

module.exports = router;
