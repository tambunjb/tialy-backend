const User = require("../models/User");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userToken = (obj) => {
  if(!obj.token){
    return jwt.sign(
      obj,
      process.env.TOKENKEY,
      { expiresIn: process.env.TOKENEXPIRY }
    );
  }
  
  return obj.token
}

exports.index = async (req, res) => {
  const users = await User.find();

  res.send(users);
}

exports.register = async (req, res) => {
  const token = await userToken({ email: req.body.email ?? null });

  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    const result = await User.findOneAndUpdate({ email: req.body.email }, { token: token })
    res.send(result.token)
  } else {
    const newUser = new User({
        email: req.body.email,
        token: token
    });
    const result = await newUser.save()
    res.send(result.token)
  }
};
