const router = require("express").Router();

const blogPostRoutes = require("./blog-post");
const userRoutes = require("./user-routes");
const blogDeleteRoutes = require("./blog-delete");
const blogCommentRoutes = require("./blog-comment");

router.use("/blog-form", blogPostRoutes);
router.use("/users", userRoutes);
router.use("/blog-delete", blogDeleteRoutes);
router.use("/blog-comment", blogCommentRoutes);

module.exports = router;
