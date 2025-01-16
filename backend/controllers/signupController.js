const CustomerModel = require('../models/customerModel');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signUpUser = async (req, res) => {
    const { email, password, firstName, lastName, address, phoneNumber } = req.body;

    try {
        const existingUser = await CustomerModel.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpires = new Date(Date.now() + 3600000);

        const userId = await CustomerModel.createCustomer({
            email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber,
            verificationToken,
            tokenExpires,
        });

        const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

        const msg = {
            to: email,
            from: 'minhascjahangir@gmail.com',
            subject: 'Verify Your Email',
            html: `<p>Hi ${firstName},</p>
                   <p>Click the link below to verify your email:</p>
                   <a href="${verificationUrl}">Verify Email</a>
                   <p>This link will expire in 1 hour.</p>`,
        };

        await sgMail.send(msg);

        res.status(200).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
