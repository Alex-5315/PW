const express = require('express');
const router = express.Router();
const authController = requiere('../controller/auth.controller');

router.post('/auth/login',authController.login);

module.exports = router;