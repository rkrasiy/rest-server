const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const loginController = async(req, res = response) => {
  const {email, password} = req.body;

  try{

    //Check email exist
    const user = await User.findOne({ email });
    if( !user ){
      return res.status(400).json({
        msg: 'Email or Password does\'t correct'
      });
    }

    // Check if user state is TRUE
    if(!user.state){
      return res.status(400).json({
        msg: 'Check your state'
      })
    }

    // Check psw
    const isValidPsw = bcryptjs.compareSync( password, user.password );
    if(!isValidPsw){
      return res.status(400).json({
        msg: 'Email or Password does\'t correct. PSW'
      });
    }

    // Generate JWT
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

  }catch(err){
    console.log(err);
    return res.status(500).json({
      msg: 'Ask an admin'
    })
  }


};

module.exports = {
  loginController
}