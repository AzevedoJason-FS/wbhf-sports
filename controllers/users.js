const mongoose = require("mongoose");
const Users = require("../models/user");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    Users.find()
      .lean()
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

const signup = async (req, res, next) => {
  try {
    // get info
    const { name, password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    //Store new user in DB
    const newUser = new Users({
      name: name,
      password: hashPassword,
    });

    //Adding new document to DB
    await newUser.save();

    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    //Sucess
    res.status(200).json({ message: "User Created Successfuly", newUser });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
    try{
        //get credentials
        const {name, password} = req.body

        //check email
        const user = await Users.findOne({name})
        if(!user) return res.status(400).json({message: 'This user is not registered'})

        //check password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: 'This password is incorrect'})

        // Creating refresh token not that expiry of refresh 
        const token = createSecretToken(user._id)

        // Successful, assigning refresh token in http-only cookie 
        res.cookie('token', token, { 
            httpOnly: false, 
            withCredentials: true
        })

        //signin success
        res.status(201).json({message: 'User logged in successfully'})
        
    }catch(err){
        res.status(500).json({message: err.message })
    }
};

module.exports = { getUsers, signup, login };
