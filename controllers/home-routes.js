const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
    try {

        const dbBlogData = await Blog.findAll();
        const blogs = dbBlogData.map((blog) =>
            blog.get({ plain: true})
        );

        res.render('homepage', {
            blogs
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;