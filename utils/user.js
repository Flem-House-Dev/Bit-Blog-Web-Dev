const addUserToLocals = (req, res, next) => {
    if (req.session.username) {
        res.locals.user = {
            username: req.session.username,
            id: req.session.id,
        };
    }
    next();
};

module.exports = addUserToLocals;
