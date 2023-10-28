const express = require('express');
const router = express();

const { registerUser } = require('./controller/user.js');
const loginUser = require('./controller/login.js');

router.post('/usuario', registerUser)
router.post('/login', loginUser)

module.exports = router;