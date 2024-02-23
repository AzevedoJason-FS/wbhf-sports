const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    social: [
        {
            name: {
                type: String
            },
            link:{
                type: String
            }
        }
    ],
    slug: {
        type: String
    }
});

module.exports = mongoose.model("teams", teamSchema);