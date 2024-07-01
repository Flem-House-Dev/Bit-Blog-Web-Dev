const router = require('express').Router();
const { Comment } = require('../../models');

router.post("/", async (req,res) => {
    try {
        
        const newComment = await Comment.create({
            author_id: req.session.user_id,
            blog_id: req.body.blogId,
            post_date: new Date(),
            text_content: req.body.commentTextContent,
        });

        res.status(201).json(newComment);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;