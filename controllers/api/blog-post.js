
// const express = require('express') ;
const router = require('express').Router();
const { Blog, User } = require('../../models')

router.post('/', async (req, res) => {

    try {
        // const { title, content } = req.body;

        const newBlogPost = await Blog.create({
            // title,
            // author: req.session.username,
            // content,
            ...req.body,
            author_id: req.session.user_id,
            post_date: new Date()
        });

        res.status(201).json(newBlogPost);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

});

module.exports = router;