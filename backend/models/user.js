const db = require('../config/db');

class User {
  static async findByEmail(email) {
    try {
      const [results] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const [results] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
      return results[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;