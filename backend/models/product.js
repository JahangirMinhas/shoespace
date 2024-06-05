const db = require('../config/db');

class Product {
  constructor(id, title, brand, collection, color, price, src) {
    this.id = id;
    this.title = title;
    this.brand = brand;
    this.collection = collection;
    this.color = color;
    this.price = price;
    this.src = src;
  }

  static getByCollection(collection, callback) {
    db.query('SELECT * FROM products WHERE collection = ?', [collection], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        const products = results.map(row => new Product(row.id, row.title, row.brand, row.collection, row.color, row.price, row.src));
        callback(null, products);
      }
    });
  }
}

module.exports = Product;
