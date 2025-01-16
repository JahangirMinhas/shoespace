const bcrypt = require('bcrypt');
const CustomerModel = require('../models/customerModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await CustomerModel.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    if (!user.is_verified) {
      return res.status(400).json({ message: 'Please verify your email before logging in.' });
    }

    const correct = await bcrypt.compare(password, user.password_hash);

    if (correct) {
      req.session.userId = user.id;
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.checkStatus = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not logged in.' });
    }

    const user = await CustomerModel.findById(req.session.userId);

    if (user) {
      const userData = {
        isLoggedIn: true,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phone_number,
      };
      res.json(userData);
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.logout = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).send('Not logged in');
    }

    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.clearCookie('connect.sid');
      const userData = {
        isLoggedIn: false,
        firstName: '',
      };
      return res.json(userData);
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send('Internal Server Error');
  }
};
