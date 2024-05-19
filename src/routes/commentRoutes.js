const express = require('express');
const router = express.Router();
const authMiddleware  = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');

// Fetch comments for a blog post
router.get('/comments/:postSlug', commentController.getCommentsByPostId);

// Add a new comment
router.post('/comments', authMiddleware, commentController.addComment);


module.exports = router;