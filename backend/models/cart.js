const db = require('../config/db');
class Cart {
    static async addToCard(product_id, customer_id) {


        const query = `
            INSERT INTO carts (customer_id, created_at, updated_at)
            SELECT 'desired_customer_id', NOW(), NOW()
            WHERE NOT EXISTS (
            SELECT 1 FROM carts WHERE customer_id = 'desired_customer_id'
            );`;
        const [result] = await db.query(query, [customer_id, customer_id]);
    }
}

module.exports = Cart;