const Joi = require('joi');

exports.registerSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    'string.empty': "Name is required!"
  }),
  email: Joi.string().email().required().messages({
    'string.email': "Please enter a valid email address!"
  }),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'admin', 'super-admin').default('user')
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});