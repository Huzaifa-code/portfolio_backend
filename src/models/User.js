// Data models for interacting with the database
// Data models for interacting with the database

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatar : {
        type: String,
        default: 'default_avatar.jpg' //if not present add First Letter of name 
    }   
})

const User = mongoose.model('User', userSchema);

module.exports = User;
