const router = require('express').Router();
const { readUsers, readUserById, createUser } = require('../controllers/users');

router.get('/:id', readUserById);
router.get('/', readUsers);
router.post('/', createUser);

module.exports = router;
