const fieldsValidator = require('../middlewares/fileds-validator');
const validateJWT = require('../middlewares/validate-jwt');
const hasPermissions = require('../middlewares/validate-role');

module.exports = {
  ...fieldsValidator,
  ...validateJWT,
  ...hasPermissions
}