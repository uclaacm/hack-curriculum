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
}));

module.exports = Post;