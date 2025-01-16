const express = require('express');
const router = express.Router();
const signupController = require('../../controllers/signupController');
const verifyEmailController = require('../../controllers/verifyEmailController');

router.post('/', signupController.signUpUser);
router.get('/verify-email', verifyEmailController.verifyEmail);

module.exports = router;