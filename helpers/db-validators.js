const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async(rol = '') => {
  const isExistRole = await Role.findOne({ name: rol});
  if(!isExistRole){
    throw new Error(`Role ${rol} is not registrated in database`)
  }
};

const isUniqEmail = async(email = '') => {
    // Check if email exist;
  const existEmail = await User.findOne({ email });
  if(existEmail){
    throw new Error(`${email} already exist`)
  }
}

const isUserIdExist = async(id = '') => {
  // Check if email exist;
const existUserID = await User.findById(id);
if(!existUserID){
  throw new Error(`ID: ${id} does't exist`)
}
}

module.exports = {
  isValidRole,
  isUniqEmail,
  isUserIdExist
}