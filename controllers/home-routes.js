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
});

router.get('/blog/:id', async (req,res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id);

        if(!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        };

        const blog = dbBlogData.get({ plain: true });

        res.render('blog-page', {blog})
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/blog-form', async (req,res) => {
    try {
        res.render('blog-form');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;