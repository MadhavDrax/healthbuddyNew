const rateLimit = require('express-rate-limit');

// Strict rate limit for Auth routes (Login/Signup/Forgot Password)
// 5 requests per 15 minutes to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 requests per 15 mins
  message: {
    error: 'Too many authentication attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = authLimiter;
