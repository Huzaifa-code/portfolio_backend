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

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }


  try {
    const newComment = new Comment({ postSlug, text, userId });
    await newComment.save();

    const populatedComment = await newComment.populate('userId');

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ error: 'Server error', err });
  }
};
