const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

router.get('/:type', productController.getProductsByCollection);

module.exports = router;