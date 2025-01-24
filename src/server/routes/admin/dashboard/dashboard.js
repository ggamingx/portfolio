const express = require('express');
const router = express.Router();
const {emailCheckMiddleware, isLoggedIn} = require('../../../middlewares/isAdmin');
const path = require('path');
const { loadData } = require('../../../middlewares/manageData');

const blogsFilePath = path.join(__dirname, '../../../../public/404.html');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../admin/dashboard/index.html'))
})

router.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../admin/dashboard/post.html'))
})

router.get('/blogs', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../admin/dashboard/blogs.html'))
})

router.get('/:type/edit/:id', (req, res) => {
    const type = req.params.type;
    const id = req.params.id;

    if (!['blogs', 'projects'].includes(type)) {
        return res.status(404).sendFile(path.join(__dirname, '../../../../public/404.html'));
    }

    const filePath = type === 'blogs' 
        ? path.join(__dirname, '../../../../database/blogs.json') 
        : path.join(__dirname, '../../../../database/projects.json');

    const data = loadData(filePath);
    const post = data.find(item => item.id === id);

    if(!post) {
        return res.status(404).sendFile(path.join(__dirname, '../../../../public/404.html'));
    }
    
    res.sendFile(path.join(__dirname, '../../../../admin/dashboard/edit.html'))
})

router.use(express.static(path.join(__dirname, '../../../../admin')));

module.exports = router;