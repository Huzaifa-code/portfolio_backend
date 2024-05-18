// Authentication routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateEmail = require('../middleware/emailValidator');
const authMiddleware = require('../middleware/authMiddleware')


// POST /signup - Route for user signup
router.post('/signup',validateEmail ,authController.signup);

// POST /login - Route for user login
router.post('/login', authController.login);


router.post('/logout', authController.logout);

router.get('/protected-route', authMiddleware, (req, res) => {
    // Access req.user to get user information
    res.json({ message: 'Authenticated' });
});

module.exports = router;
