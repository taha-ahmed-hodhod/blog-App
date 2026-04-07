const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validatorMiddleware');
const { signupSchema, loginSchema } = require('../validators/schemas')
const router = express.Router();

router.post('/register', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;