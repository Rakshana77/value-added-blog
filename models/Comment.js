const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Comment author
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true }, // Related blog post
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
