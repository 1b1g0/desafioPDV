const express = require('express');
const router = express();

const { registerUser } = require('./controller/user.js');
const loginUser = require('./controller/login.js');
const { listCategories } = require('./controller/product.js');

router.post('/usuario', registerUser)
router.post('/login', loginUser)
router.get('/categoria', listCategories)

module.exports = router;