const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const { uploadMiddleware, uploadToImageKit } = require('../utils/imageKit');
const { postSchema } = require('../validators/schemas');
const router = express.Router();
const validate = require('../middlewares/validatorMiddleware'); 
router.use(authController.protect);

router
  .route('/')
  .get(postController.getAllPosts) 
  .post(
    uploadMiddleware,   
    uploadToImageKit,
    validate(postSchema),   
    postController.createPost 
  );

router.get('/my-posts', postController.getUserPosts);
router.get('/user/:userId', postController.getUserPosts);


router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost); 

module.exports = router;