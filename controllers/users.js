
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req, res = response) => {

  const { offset = 5, limit = 5 } = req.query;
  const _limit = isNaN(limit) ? 5 : Number(limit);
  const _offset = isNaN(offset) ? 5 : Number(offset);

  const query = {state: true};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(_offset)
      .limit(_limit)
  ]);

  res.json({
    total,
    items: users
  })
}

const updateUsers = async (req, res) => {

  const { id } = req.params;
  const { _id, password, google, email, ...rest} = req.body;

  //TODO : validate userID

    // Crypt password
  if( password ){
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
}

const newUser = async (req, res) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Crypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();


  res.status(201).json(user);
}

const removeUser = async (req, res) => {
  const { id } = req.params;

  // const user = await User.findByIdAndDelete( id );
  const user = await User.findByIdAndUpdate(id, { state: false}, {new: true});
  res.json(user);
}

module.exports = {
  getUsers,
  updateUsers,
  newUser,
  removeUser
}