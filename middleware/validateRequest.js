const Joi = require('joi');

const validateBlogPost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string()),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateBlogPost };
