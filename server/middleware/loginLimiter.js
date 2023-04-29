const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowsMS: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 login requests per minute
  message: { message: 'Too many login attemps from this IP, please try again after minute' },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

module.exports = loginLimiter;
