// Utility function for custom error handling
const handleError = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

// Utility function for logging
const logRequest = (req) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
};

// Utility function to format a date to a readable string
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

module.exports = { handleError, logRequest, formatDate };
