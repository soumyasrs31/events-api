const { signup, login, getLoggedInUser } = require('../controllers/auth');
const verifyLogin = require('../middlewares/verifyLogin');

const router = require('express').Router();

// signup
router.post('/signup', signup);

//login
router.post('/login', login);

// get loggedin user
router.get('/loggedInUser', verifyLogin, getLoggedInUser);

module.exports = router;
