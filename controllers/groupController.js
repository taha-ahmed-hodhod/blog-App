const Group = require('../models/groupModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createGroup = catchAsync(async (req, res, next) => {
  const newGroup = await Group.create({
    name: req.body.name,
    description: req.body.description,
    admins: [req.user.id], 
    members: [req.user.id] 
  });

  res.status(201).json({
    status: 'success',
    data: { group: newGroup }
  });
});

exports.addMember = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) return next(new AppError('No group found with that ID', 404));

  const isRequesterAdmin = group.admins.some(adminId => adminId.toString() === req.user.id);
  
  if (!isRequesterAdmin && req.user.role !== 'admin') {
    return next(new AppError('Only group admins can add members', 403));
  }

  if (group.members.some(id => id.toString() === req.body.userId)) {
    return next(new AppError('User is already a member of this group', 400));
  }

  group.members.push(req.body.userId);
  await group.save();

  res.status(200).json({
    status: 'success',
    data: { group }
  });
});

exports.promoteToAdmin = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) return next(new AppError('Group not found', 404));

  const isRequesterAdmin = group.admins.some(adminId => adminId.toString() === req.user.id);
  if (!isRequesterAdmin) {
    return next(new AppError('Only admins can promote others to admin', 403));
  }

  if (!group.members.some(id => id.toString() === req.body.userId)) {
    return next(new AppError('User must be a member first to be promoted', 400));
  }

  if (!group.admins.some(id => id.toString() === req.body.userId)) {
    group.admins.push(req.body.userId);
    await group.save();
  }

  res.status(200).json({
    status: 'success',
    data: { group }
  });
});

exports.leaveGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) return next(new AppError('Group not found', 404));

  const isAdmin = group.admins.some(id => id.toString() === req.user.id);

  if (isAdmin && group.admins.length === 1) {
    return next(new AppError('You are the only admin. Assign another admin before leaving or delete the group.', 400));
  }

  group.members.pull(req.user.id);
  group.admins.pull(req.user.id);
  
  await group.save();

  res.status(200).json({
    status: 'success',
    message: 'You have left the group'
  });
});

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find().populate('admins', 'username photo');

  res.status(200).json({
    status: 'success',
    results: groups.length,
    data: { groups }
  });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) return next(new AppError('Group not found', 404));

  const isRequesterAdmin = group.admins.some(adminId => adminId.toString() === req.user.id);

  if (!isRequesterAdmin && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to delete this group', 403));
  }

  await Group.findByIdAndDelete(req.params.groupId);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) return next(new AppError('Group not found', 404));

  const isRequesterAdmin = group.admins.some(id => id.toString() === req.user.id);
  if (!isRequesterAdmin && req.user.role !== 'admin') {
    return next(new AppError('Only admins can remove members', 403));
  }

  const userToRemove = req.body.userId;

  const isTargetAdmin = group.admins.some(id => id.toString() === userToRemove);
  if (isTargetAdmin && req.user.id !== userToRemove) {
    return next(new AppError("You cannot remove another admin; you must demote them to a regular member first.", 400));
  }

  group.members.pull(userToRemove);
  group.admins.pull(userToRemove);
  
  await group.save();

  res.status(200).json({
    status: 'success',
    message: "User removed from the group successfully"
  });
});

exports.demoteFromAdmin = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  
  const isRequesterAdmin = group.admins.some(id => id.toString() === req.user.id);
  if (!isRequesterAdmin) {
    return next(new AppError("Only admins can modify permissions", 403));
  }

  const userToDemote = req.body.userId;

  if (userToDemote === req.user.id && group.admins.length === 1) {
    return next(new AppError("You are the only admin; you cannot revoke your own permissions.", 400));
  }

  group.admins.pull(userToDemote);
  await group.save();

  res.status(200).json({
    status: 'success',
    message: "Admin permissions revoked successfully"
  });
});