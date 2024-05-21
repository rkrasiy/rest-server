const { Router } = require('express');
const { getUsers, updateUsers, newUser, removeUser } = require('../controllers/users');

const router = Router();

router.get("/", getUsers);

router.put("/:id", updateUsers);

router.post("/", newUser);

router.delete("/", removeUser);

module.exports = router;
