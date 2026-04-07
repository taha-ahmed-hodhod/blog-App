const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.use(authController.protect); 

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin')); 

router
  .route('/')
  .get(adminController.getAllUsers);

router
  .route('/:id')
  .get(adminController.getUser)     
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser); 

module.exports = router;