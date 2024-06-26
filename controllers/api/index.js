const router = require("express").Router();

const blogPostRoutes = require("./blog-post");
const userRoutes = require("./user-routes");

router.use("/blog-form", blogPostRoutes);
router.use("/users", userRoutes);

module.exports = router;
