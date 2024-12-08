const Comment = require('../models/Comment.js');
const BlogPost = require('../models/BlogPost.js');
const { handleError, logRequest } = require('../utils/utils.js');

// Get all comments for a specific post
const getCommentsForPost = async (req, res) => {
  try {
    logRequest(req);
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate('author', 'name email');
    res.json(comments);
  } catch (error) {
    handleError(res, 500, 'Failed to fetch comments');
  }
};

// Create a new comment for a post
const createComment = async (req, res) => {
  try {
    logRequest(req);
    const postId = req.params.postId;
    const { content } = req.body;

    if (!content) {
      return handleError(res, 400, 'Content is required');
    }

    const post = await BlogPost.findById(postId);
    if (!post) {
      return handleError(res, 404, 'Post not found');
    }

    const comment = new Comment({
      content,
      post: postId,
      author: req.user._id,
    });

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
  } catch (error) {
    handleError(res, 500, 'Failed to create comment');
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    logRequest(req);
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return handleError(res, 404, 'Comment not found');
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return handleError(res, 403, 'Unauthorized to update this comment');
    }

    comment.content = req.body.content || comment.content;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    handleError(res, 500, 'Failed to update comment');
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    logRequest(req);
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return handleError(res, 404, 'Comment not found');
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return handleError(res, 403, 'Unauthorized to delete this comment');
    }

    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (error) {
    handleError(res, 500, 'Failed to delete comment');
  }
};

module.exports = {
  getCommentsForPost,
  createComment,
  updateComment,
  deleteComment,
};
