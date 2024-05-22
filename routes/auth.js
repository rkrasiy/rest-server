const { Router } = require('express');
const { check } = require('express-validator');
const { loginController } = require('../controllers/auth.controller');
const { fieldsValidator } = require('../middlewares/fileds-validator');


const router = Router();

router.post("/login",[
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  fieldsValidator
], loginController);

module.exports = router;
