const db = require('../config/db');
const bcrypt = require('bcrypt');

const generateRandomId = () => {
    return Math.floor(10000 + Math.random() * 90000);
};

const checkIdExists = async (id) => {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM customers WHERE id = ?', [id]);
    return rows[0].count > 0;
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const getUniqueId = async () => {
    let id;
    let idExists = true;
    while (idExists) {
        id = generateRandomId();
        idExists = await checkIdExists(id);
    }
    return id;
};

class CustomerModel {
    static async createCustomer({ email, password, firstName, lastName, address, phoneNumber }) {
        const id = await getUniqueId();
        const hashedPassword = await hashPassword(password);

        const query = `
            INSERT INTO customers (id, password_hash, email, first_name, last_name, address, phone_number, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        // Execute the query
        const [result] = await db.query(query, [id, hashedPassword, email, firstName, lastName, address, phoneNumber]);
        return result.insertId;
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM customers WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        return rows[0]; 
    }
}

module.exports = CustomerModel;