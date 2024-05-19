// controllers/commentController.js
const Comment = require('../models/Comment');

exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postSlug: req.params.postSlug }).populate('userId');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  const { postSlug, text, userId } = req.body;
  try {
    const newComment = new Comment({ postSlug, text, userId });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
