const { response } = require("express");

const isAdminRole = ( req, res = response, next) => {
  if(!req.user){
    return res.status(500).json({
      msg: 'Token should be validated first'
    });
  }

  const { role, name } = req.user;
  if( role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} doesn't have permissions`
    });
  }

  next();
}

const hasPermissions = ( req, res = response, next) => {
  if(!req.user){
    return res.status(500).json({
      msg: 'Token should be validated first'
    });
  }

  const { role, name } = req.user;
  if( role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} doesn't have permissions`
    });
  }

  next();
}

module.exports = {
  isAdminRole,
  hasPermissions
}