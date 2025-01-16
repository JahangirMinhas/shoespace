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

  static async getByCollection(collection) {
    try {
      const [results] = await db.query('SELECT * FROM products WHERE collection = ?', [collection]);
      const products = results.map(
        (row) => new Product(row.id, row.title, row.brand, row.collection, row.color, row.price, row.src)
      );
      return products;
    } catch (err) {
      throw err;
    }
  }

  static async getBySearch(term) {
    try {
      const [results] = await db.query('SELECT * FROM products WHERE title LIKE ?', [`%${term}%`]);
      const products = results.map(
        (row) => new Product(row.id, row.title, row.brand, row.collection, row.color, row.price, row.src)
      );
      return products;
    } catch (err) {
      throw err;
    }
  }

  static async getByPrice(minPrice = 0, maxPrice = 500) {
    try {
      const [results] = await db.query('SELECT * FROM products WHERE price BETWEEN ? AND ?', [minPrice, maxPrice]);
      const products = results.map(
        (row) => new Product(row.id, row.title, row.brand, row.collection, row.color, row.price, row.src)
      );
      return products;
    } catch (err) {
      throw err;
    }
  }

  static async getFilteredProducts(collection, brands, minPrice = 0, maxPrice = 500) {
    try {
      let query = `SELECT * FROM products WHERE collection = ? AND price BETWEEN ? AND ?`;
      const values = [collection, minPrice, maxPrice];

      if (brands && brands.length > 0) {
        query += ` AND brand IN (?)`;
        values.push(brands);
      }

      const [results] = await db.query(query, values);
      const products = results.map(
        (row) => new Product(row.id, row.title, row.brand, row.collection, row.color, row.price, row.src)
      );
      return products;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
