const mongoose = require("mongoose");
const Posts = require("../models/post");

const getPosts = (req, res) => {
  try {
    Posts.find()
      .lean()
      .sort({ created_at: -1 })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getSinglePost = (req, res) => {
  const slug = req.params.slug;
  try {
    Posts.find({ slug: slug })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const createPost = (req, res) => {
  try {
    //get credentials
    const { location, title, body, slug, img } = req.body;

    const newPost = new Posts({
        location: location,
        title: title,
        body: body,
        slug: slug,
        img: img,
    });
    
    //Write to Database
    newPost.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Post Saved", result
            })
        })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deletePost = (req, res, next) => {
  try{
    Posts.deleteOne({ "_id" : req.params.id })
    .then(result => {
      res.status(200).json(result)
    })
  }catch(e){
    res.status(500).json({message: err})
  }



};

module.exports = { getPosts, getSinglePost, createPost, deletePost };
