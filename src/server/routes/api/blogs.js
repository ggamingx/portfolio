require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const { loadData, saveData, upload } = require('../../middlewares/manageData');

const blogsFilePath = path.join(__dirname, '../../../database/blogs.json');

function generateSlug(title, existingSlugs) {
    let slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    let uniqueSlug = slug;
    let count = 1;

    while (existingSlugs.includes(uniqueSlug)) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }

    return uniqueSlug;
}

function addData(title, img, content, description) {
    const data = loadData(blogsFilePath);
    const existingSlugs = data.map(blog => blog.id);
    const slug = generateSlug(title, existingSlugs);
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date);

    const newBlog = {
        id: slug,
        title: title,
        image: img,
        content: content,
        description: description,
        view: "public",
        date: formattedDate
    };
    data.push(newBlog)
    console.log(`added new blog:\n${JSON.stringify(newBlog, null, 2)}`)
    saveData(data, blogsFilePath)
}

router.get('/blogs', async (req, res) => {
    const data = loadData(blogsFilePath)
    const blogs = data.filter(blog => blog.view === 'public')

    res.json(blogs)
})

router.get('/blogs/:id', async (req, res) => {
    const data = loadData(blogsFilePath);
    const blog = data.find(blog => blog.id === req.params.id);

    if (!blog || blog.view !== 'public') {
        return res.status(404).json({ message: "blog not found"});
    }

    res.json({
        title: blog.title,
        image: blog.image,
        content: blog.content,
        description: blog.description,
        date: blog.date
    })
})

router.post('/blogs', upload.single('cover'), (req, res) => {
    const { title, content, description, imageTitle, imageAuthor, imageLink, imageAuthorLink } = req.body;
    const img = req.file ? `http://${process.env.HOST}:${process.env.PORT}/api/blogs/cover/${req.file.filename}` : imageLink || null;
    if (!title && !content && !description) {
        return res.status(400).json({ message: 'Insufficient data'})
    }
    const imgInfo = img ? {
        img: img,
        imgTitle: imageTitle,
        imgAuthor: imageAuthor,
        imgAuthorLink: imageAuthorLink,
        imgLink: imageLink
    } : null;
    addData(title, imgInfo, content, description)
    const data = loadData(blogsFilePath)

    const newBlog = data.find(blog => blog.title === title && blog.content === content);
    if (!newBlog) {
        return res.status(500).json({ message: 'Failed to retrieve the newly added blog' });
    }

    res.status(201).json({ message: `New blog added`, id: newBlog.id})
})

router.put('/blogs/:id', upload.single('cover'), (req, res) => {
    res.json({ message: "soon"})
})

router.use('/blogs/cover', express.static(path.join(__dirname, '../../../database/images')))

module.exports = router;