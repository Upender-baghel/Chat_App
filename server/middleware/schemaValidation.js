const Joi = require("joi");

// Define the schema for user sign-up
exports.userSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
