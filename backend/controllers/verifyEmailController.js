const CustomerModel = require('../models/customerModel');

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const isVerified = await CustomerModel.verifyCustomer(token);

        if (!isVerified) {
            return res.status(400).json({ message: 'Invalid or expired verification token.' });
        }

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};