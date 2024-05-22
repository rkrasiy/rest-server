const { response } = require('express');
require('dotenv');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {
  const token = req.header('x-token')

  if(!token){
    return res.status(401).json({
      msg: 'Token is required'
    })
  }

  try{
    const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    const user = await User.findById( uid );

    if(!user){
      return res.status(401).json({
        msg: 'Token isn\'t valid'
      })
    }
    //Is active user
    if(!user.state){
      return res.status(401).json({
        msg: 'Token isn\'t valid'
      })
    }

    req.user = user;

    next();
  }catch(err){
    console.log(err);
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }
};

module.exports = {
  validateJWT
}