const express = require('express');
const { body } = require('express-validator');
const {
  getPublicPosts,
  getPublicPost,
  getDashboardPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const postValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
];

// Public routes
router.get('/public', getPublicPosts);
router.get('/public/:id', getPublicPost);

// Protected routes
router.get('/dashboard', protect, getDashboardPosts);
router.get('/:id', protect, getPost);
router.post('/', protect, postValidation, createPost);
router.put('/:id', protect, postValidation, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
