const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const rateLimit = require('express-rate-limit');

// 🛡️ Sentinel: Rate limiter to prevent brute-force attacks on authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


// Register a new user
router.post('/register', authLimiter, authController.register);

// Login user
router.post('/login', authLimiter, authController.login);

// Forgot password
router.post('/forgot-password', authLimiter, authController.forgotPassword);

// Reset password
router.post('/reset-password', authLimiter, authController.resetPassword);

module.exports = router;
