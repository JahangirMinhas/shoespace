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
    static async createCustomer({ email, password, firstName, lastName, address, phoneNumber, verificationToken, tokenExpires }) {
        const id = await getUniqueId();
        const hashedPassword = await hashPassword(password);

        const query = `
            INSERT INTO customers (id, password_hash, email, first_name, last_name, address, phone_number, is_verified, verification_token, token_expires, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        const [result] = await db.query(query, [
            id,
            hashedPassword,
            email,
            firstName,
            lastName,
            address,
            phoneNumber,
            false,
            verificationToken,
            tokenExpires,
        ]);
        return result.insertId;
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM customers WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        return rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM customers WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }

    static async verifyCustomer(verificationToken) {
        const query = `
            UPDATE customers 
            SET is_verified = TRUE, verification_token = NULL, token_expires = NULL
            WHERE verification_token = ? AND token_expires > NOW()
        `;
        const [result] = await db.query(query, [verificationToken]);
        return result.affectedRows > 0;
    }
}

module.exports = CustomerModel;
