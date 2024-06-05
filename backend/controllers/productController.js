const Product = require('../models/product');

exports.getProductsByCollection = (req, res) => {
  const collection = req.params.type;

  Product.getByCollection(collection, (err, products) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json(products);
    }
  });
};