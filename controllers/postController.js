const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { imagekit } = require('../utils/imageKit'); 






const Group = require('../models/groupModel');

exports.createPost = catchAsync(async (req, res, next) => {
  const { content, groupId, images, imageIds } = req.body;

  if (!content && (!images || images.length === 0)) {
    return next(new AppError("Post must contain either text or images!", 400));
  }

  if (groupId) {
    const group = await Group.findById(groupId);
    if (!group) {
      return next(new AppError("Group not found!", 404));
    }

    const isMember = group.members.some(id => id.toString() === req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isMember && !isAdmin) {
      return next(new AppError("You must be a member of the group to post in it!", 403));
    }
  }

  const newPost = await Post.create({
    content,
    author: req.user.id,
    group: groupId || null,
    images: images || [],
    imageIds: imageIds || []
  });

  res.status(201).json({
    status: 'success',
    data: { post: newPost }
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const userGroups = await Group.find({ members: req.user.id }).select('_id');
  const groupIds = userGroups.map(g => g._id);

  const filter = {
    $or: [
      { group: null },
      { group: { $in: groupIds } }
    ]
  };

  const posts = await Post.find(filter)
    .populate('author', 'username photo')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: { posts }
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ author: req.params.userId || req.user.id })
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: { posts }
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found with this ID!", 404));
  }


  if (post.author.toString() !== req.user.id) {
    return next(new AppError("You are not allowed to edit other users' posts!", 403));
  }


  const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      content: req.body.content,
  }, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: { post: updatedPost }
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("This post does not exist to be deleted!", 404));
  }

  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError("You cannot delete a post that does not belong to you; action not allowed!", 403));
  }

  if (post.imageIds && post.imageIds.length > 0) {
    await imagekit.bulkDeleteFiles(post.imageIds);
  }

  await Post.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});