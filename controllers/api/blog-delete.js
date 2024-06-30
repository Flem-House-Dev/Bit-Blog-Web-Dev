const router = require('express').Router();
const { Blog } = require('../../models');

router.delete('/:id', async (req,res) => {
    try {
        Blog.destroy({
            where: {
                id: req.params.id,
                author_id: req.session.user_id,
            },
        });
        return res.status(200).json({ message: 'Blog deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;