const CustomerModel = require('../models/customerModel');

exports.signUpUser = async (req, res) => {
    const { email, password, firstName, lastName, address, phoneNumber } = req.body;

    try {
        const existingUser = await CustomerModel.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        
        const userId = await CustomerModel.createCustomer({
            email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber
        });

        res.status(200).json({ message: 'User registered successfully.', userId });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};