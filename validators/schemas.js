const Joi = require('joi');

exports.signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
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

exports.postSchema = Joi.object({
  content: Joi.string().min(1).required(),
  groupId: Joi.string().hex().length(24).optional(), 
  images: Joi.array().items(Joi.string()).optional(),
  
  imageIds: Joi.array().items(Joi.string()).optional() 
});

exports.groupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().max(500).optional()
});

exports.memberActionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required()
});