const { Router } = require('express');
const { check } = require('express-validator');
const {fieldsValidator, hasPermissions, isAdminRole, validateJWT} = require('../middlewares');

const { getUsers, updateUsers, newUser, removeUser } = require('../controllers/users');
const { isValidRole, isUniqEmail, isUserIdExist } = require('../helpers/db-validators');

const router = Router();

router.get("/", getUsers);

router.put("/:id",[
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isUserIdExist),
  check('role').custom( isValidRole ),
  fieldsValidator
], updateUsers);

router.post("/", [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password should contain more than 6 characters').isLength({min: 6}),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(isUniqEmail),
  check('role').custom( isValidRole ),
  fieldsValidator
],newUser);

router.delete("/:id", [
  validateJWT,
  // isAdminRole,
  hasPermissions(),
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isUserIdExist),
  fieldsValidator
], removeUser);

module.exports = router;
