const mongoose = require("mongoose");

const sportSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug:{
        type: String
    }
});

module.exports = mongoose.model("sports", sportSchema);