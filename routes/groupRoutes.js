const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');
const { groupSchema, memberActionSchema } = require('../validators/schemas');
const validate = require('../middlewares/validatorMiddleware');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(groupController.getAllGroups)  
  .post(validate(groupSchema), groupController.createGroup);

router.post('/:groupId/add-member', validate(memberActionSchema), groupController.addMember);
router.delete('/:groupId/remove-member', groupController.removeMember); 

router.patch('/:groupId/promote', validate(memberActionSchema), groupController.promoteToAdmin);
router.patch('/:groupId/demote', groupController.demoteFromAdmin);    

router.delete('/:groupId/leave', groupController.leaveGroup);

router
  .route('/:groupId')
  .delete(groupController.deleteGroup); 

module.exports = router;