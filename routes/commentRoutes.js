const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/protect.js');
const {
  createComment,
  updateComment,
  deleteComment,
} = require('../controller/commentController.js');

// Protect routes that require authentication
router.post('/:postId/comments', protect, createComment); // Only logged-in users can create comments
router.put('/:postId/comments/:commentId', protect, updateComment); // Only logged-in users can update comments
router.delete('/:postId/comments/:commentId', protect, deleteComment); // Only logged-in users can delete comments

module.exports = router;
