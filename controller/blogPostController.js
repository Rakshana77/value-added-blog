const BlogPost = require('../models/BlogPost.js');
const { handleError, logRequest, formatDate } = require('../utils/utils.js');

// Get all blog posts
const getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({});
    res.json(posts);
  } catch (error) {
    handleError(res, 500, 'Failed to fetch posts');
  }
};

// Create a new blog post
const createPost = async (req, res) => {
  try {
    //logRequest(req); // Log request details

    const { title, content, tags } = req.body;
    if (!title || !content) {
      return handleError(res, 400, 'Title and content are required');
    }

    const newPost = new BlogPost({
      title,
      content,
      tags,
      author: req.user._id,
    });

    const createdPost = await newPost.save();
    res.status(201).json(createdPost);
  } catch (error) {
    handleError(res, 500, 'Internal server error');
  }
};

// Update a blog post
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return handleError(res, 404, 'Post not found');
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.tags = req.body.tags || post.tags;
    
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    handleError(res, 500, 'Failed to update post');
  }
};

// Delete a blog post
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return handleError(res, 404, 'Post not found');
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error) {
    handleError(res, 500, 'Failed to delete post');
  }
};

// Search blog posts by keyword
const searchPosts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const searchQuery = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: 'i' } },  // Case-insensitive search in title
            { content: { $regex: keyword, $options: 'i' } }, // Search in content
          ],
        }
      : {};

    const posts = await BlogPost.find(searchQuery);
    res.json(posts);
  } catch (error) {
    handleError(res, 500, 'Failed to search posts');
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost, searchPosts };
