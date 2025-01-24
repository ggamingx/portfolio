const path = require('path');
const express = require('express');
const router = express.Router();
const mainRoute = require('./main')
const projocts = require('./api/projects')
const admin = require('./admin/admin')
const auth = require('./api/auth')
const blogsAPI = require('./api/blogs')
const blogs = require('./blogs')

router.use('/', mainRoute)
router.use('/api/', projocts)
router.use('/admin', admin)
router.use('/api/auth/', auth)
router.use('/api/', blogsAPI)
router.use('/blogs/', blogs)

module.exports = router;