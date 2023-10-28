const express = require('express');
const router = express();

const { registerUser } = require('./controller/user.js');

router.post('/usuario', registerUser)

module.exports = router;