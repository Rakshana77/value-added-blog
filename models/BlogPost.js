const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    tags: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Reference to comments
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
