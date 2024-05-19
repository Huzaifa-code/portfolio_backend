const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postSlug: { 
    // type: mongoose.Schema.Types.ObjectId, 
    type: String,
    // ref: 'Post', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Comment', CommentSchema);