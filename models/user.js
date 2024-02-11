const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    created_at:{
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model("Users", userSchema);