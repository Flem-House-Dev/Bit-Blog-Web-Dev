const router = require('express').Router();


const blogPostRoutes = require('./blog-post');

router.use('/blog-form', blogPostRoutes);

module.exports = router;