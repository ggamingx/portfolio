const path = require('path');
const express = require('express');
const router = express.Router();
const mainRoute = require('./main')
const projocts = require('./api/projects')

router.use('/', mainRoute)
router.use('/api/', projocts)

module.exports = router;