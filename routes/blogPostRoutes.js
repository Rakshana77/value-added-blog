
const express = require('express');
const { getPosts, createPost, updatePost, deletePost,searchPosts } = require('../controller/blogPostController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const {upload} = require('../middleware/fileupload.js');
const { validateBlogPost } = require('../middleware/validateRequest.js');
const router = express.Router();

router.get('/', getPosts);                  // Public route
router.post('/', authMiddleware, createPost); // Protected route
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.get('/search', searchPosts);
router.post('/', authMiddleware, validateBlogPost, createPost);
router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ filePath: req.file.path });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});
module.exports = router;