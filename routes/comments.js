const express = require('express');
const { body } = require('express-validator');
const {
  getComments,
  createComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:postId', getComments);

router.post(
  '/:postId',
  protect,
  [body('content').trim().notEmpty().withMessage('Comment content is required')],
  createComment
);

router.delete('/:id', protect, deleteComment);

module.exports = router;
