const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    img: {
        type: String,
    }
});

module.exports = mongoose.model("Posts", postSchema);