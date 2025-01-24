const express = require('express');
const router = express.Router();
const {emailCheckMiddleware, isLoggedIn} = require('../../middlewares/isAdmin');
const path = require('path');
const dashboard = require('./dashboard/dashboard')

router.get('/', emailCheckMiddleware, (req, res) => {
    res.redirect('/admin/dashboard')
})

router.get('/login', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../admin/login.html'))
})

router.use('/dashboard', emailCheckMiddleware, dashboard)

router.get('/unauthorized', (req, res) => {
    res.status(401).sendFile(path.join(__dirname, '../../../admin/unauthorized.html'))
})

router.use(express.static(path.join(__dirname, '../../../admin')));

module.exports = router;