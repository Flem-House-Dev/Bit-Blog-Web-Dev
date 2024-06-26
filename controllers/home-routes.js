const router = require('express').Router();
const { Blog } = require('../models');

// -------- Home page -------- 
router.get('/', async (req, res) => {
    try {

        const dbBlogData = await Blog.findAll();
        const blogs = dbBlogData.map((blog) =>
            blog.get({ plain: true })
        );

        res.render('homepage', {
            blogs
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// --------  Blog page -------- 
router.get('/blog/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id);

        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        };

        const blog = dbBlogData.get({ plain: true });

        res.render('blog-page', { blog })

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// -------- New Blog form -------- 
router.get('/blog-form', async (req, res) => {
    try {
        res.render('blog-form');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// -------- To Login screen -------- 
router.get('/login', (req, res) => {


    res.render('login');
});

// -------- To Sign Up screen -------- 
router.get('/sign-up', (req, res) => {
    res.render('new-user');
});

module.exports = router;