const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const blogPostRoutes = require('./routes/blogPostRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Parse incoming JSON

app.use('/api/auth', authRoutes);
app.use('/api/posts', blogPostRoutes);
app.use('/api/comments', commentRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
