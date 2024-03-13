const { getAllUsers, getUserById } = require('../controllers/users');

const router = require('express').Router();

router.get('/', getAllUsers)

router.get('/:id', getUserById)

module.exports = router