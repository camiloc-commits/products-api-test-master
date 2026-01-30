const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/validateRequest');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', protect, getProfile);

module.exports = router;
