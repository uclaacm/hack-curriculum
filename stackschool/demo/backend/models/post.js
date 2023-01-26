const mongoose = require('mongoose');

const Post = mongoose.model("Post", new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    num_likes: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Number
    }
}));

module.exports = Post;