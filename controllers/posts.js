const mongoose = require("mongoose");
const Posts = require("../models/post");

const getPosts = (req, res) => {
    try{
        Posts.find().lean().sort({ created_at: -1 })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({message: err})
        });
    } catch(err){
        res.status(500).json({message: err})
    }
}

module.exports = { getPosts }