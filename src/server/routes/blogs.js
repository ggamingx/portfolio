const express = require('express');
const router = express.Router();
const path = require('path');
const { loadData } = require('../middlewares/manageData')

const blogFilePath = path.join(__dirname, '../../database/blogs.json')

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../blogs/index.html'))
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = loadData(blogFilePath)
    const blog = data.find((blog) => blog.id === id)
    if (!blog) {
        res.status(404).sendFile(path.join(__dirname, '../../public/404.html'))
    } else {
        res.sendFile(path.join(__dirname, '../../blogs/blog.html'))
    }
})

router.use(express.static(path.join(__dirname, '../../blogs')))

module.exports = router