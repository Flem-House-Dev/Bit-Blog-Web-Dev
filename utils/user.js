const addUserToLocals = (req, res, next) => {
    if(req.session.username) {
        res.locals.user = {
            username: req.session.username,
            id: req.session.id,
        };
        console.log("I'm helping!!", req.session);
        console.log("local: ",res.locals);
    }
    next();
};

module.exports = addUserToLocals;