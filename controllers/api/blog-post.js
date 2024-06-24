const router = require('express').Router();
const { Blog } = require('../../models')

router.post('/', async (req, res) => {

    try {
        const { title, author, content } = req.body;

        const newBlogPost = await Blog.create({
            title,
            author,
            content,
            post_date: new Date()
        });

        res.status(201).json(newBlogPost);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

});

module.exports = router;