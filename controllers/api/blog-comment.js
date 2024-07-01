const router = require('express').Router();
const { Comment } = require('../../models');

// ---- Post comment ----

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

// ---- Delete Comment ----

router.delete("/:id", (req,res) => {
    try {
        Comment.destroy({
            where: {
                id: req.params.id,
                author_id: req.session.user_id,
            },
        });
        return res.status(200).json({ message: "Comment deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;