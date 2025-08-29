const { rateLimit } = require("express-rate-limit");

// Add Score limiter (5 requests per minute)
const addScoreLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 5,
  message: { error: "Too many score submissions, try again later." },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

module.exports = {
  addScoreLimiter,
};
