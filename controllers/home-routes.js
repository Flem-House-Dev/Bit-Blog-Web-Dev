const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.render('homepage')
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;