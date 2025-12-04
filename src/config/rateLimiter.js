const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300,                
  standardHeaders: true,  
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please slow down."
  }
});

module.exports = apiLimiter;
