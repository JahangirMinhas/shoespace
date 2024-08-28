const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    const correct = await bcrypt.compare(password, user.password_hash);
    if (user && correct) {
      req.session.userId = user.id;
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Server error');
  }
};

exports.checkStatus = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    const user = await User.findById(req.session.userId);

    if (user) {
      const userData = {
        isLoggedIn: true,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phone_number
      };
      res.json(userData);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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