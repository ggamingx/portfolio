const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.get('/google', authController.login);
router.get('/google/callback', authController.callback)
router.get('/logout', authController.logout);

module.exports = router;