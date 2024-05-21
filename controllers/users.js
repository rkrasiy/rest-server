
const { response } = require('express');

const getUsers = (req, res = response) => {

  const { page = 10, limit = 20 } = req.query;

  res.json({
    msg: 'get API - controller',
    page,
    limit
  })
}

const updateUsers = (req, res) => {

  const { id } = req.params;

  res.json({
    msg: 'put API - controller',
    id
  });
}

const newUser = (req, res) => {

  const { name, age, married, surname} = req.body;

  res.status(201).json({
    name,
    age,
    married,
    surname
  });
}

const removeUser = (req, res) => {
  res.json({
    msg: 'delete API - controller'
  });
}

module.exports = {
  getUsers,
  updateUsers,
  newUser,
  removeUser
}