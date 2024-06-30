const router = require("express").Router();

const blogPostRoutes = require("./blog-post");
const userRoutes = require("./user-routes");
const blogDeleteRoutes = require("./blog-delete");

router.use("/blog-form", blogPostRoutes);
router.use("/users", userRoutes);
router.use("/blog-delete", blogDeleteRoutes);

module.exports = router;
