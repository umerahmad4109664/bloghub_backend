const { validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Get comments for a post
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create comment
const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      post: req.params.postId,
      author: req.user._id,
    });

    await comment.populate('author', 'username');

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete comment (owner or admin)
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: 'Comment not found' });
    }

    if (
      req.user.role !== 'admin' &&
      comment.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment',
      });
    }

    await comment.deleteOne();

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getComments, createComment, deleteComment };
