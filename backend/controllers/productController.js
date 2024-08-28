const Product = require('../models/product');

exports.getProductsByCollection = async (req, res) => {
  const collection = req.params.type;
  try {
    const products = await Product.getByCollection(collection);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Database error');
  }
};

exports.getProductsBySearch = async (req, res) => {
  const searchTerm = req.query.query;
  console.log(searchTerm)
  if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    const products = await Product.getBySearch(searchTerm);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products by search:', err);
    res.status(500).send('Database error');
  }
};

exports.getProductsByPrice = async (req, res) => {
  const minPrice = parseFloat(req.query.minPrice) || 0;
  const maxPrice = parseFloat(req.query.maxPrice) || 500;

  try {
    const products = await Product.getByPrice(minPrice, maxPrice);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products by price:', err);
    res.status(500).send('Database error');
  }
};
