import rateLimiter from "express-rate-limit";

const rateLimiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 15000,
  message: "Too many requests from this IP, please try again after 15 Minutes.",
};

export default rateLimiter;
export { rateLimiterOptions };
