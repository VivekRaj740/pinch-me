const express = require('express');
const router = express.Router();




// router.use('/signin',require('../controllers/login-controller'));
router.use('/register',require('../controllers/register-controller'));
router.use('/login',require('../controllers/register-controller'));
router.use('/contacts',require('../controllers/register-controller'));
router.use('/chats',require('../controllers/chat-controller'));
// router.use('/chat',require('../controllers/login-controller'));

module.exports = router;