const express = require('express');
const {signup, login, logout, getProfile, updateProfile} = require('./../controllers/authController');
const {loginValidation, signupValidation, updateProfileValidation} = require('./../validation/authValidation');
const authMW = require('./../middlewares/authMW');

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.use(authMW);
router.post('/logout', logout);
router.get('/me', getProfile);
router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;