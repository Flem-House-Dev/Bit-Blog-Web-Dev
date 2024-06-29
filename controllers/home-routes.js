const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");

// -------- Home page --------
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["username"],
        },
      ],
      order: [["post_date", "DESC"]],
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// --------  Blog page --------
router.get("/blog/:id", withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["username"],
        },
      ],
    });

    if (!dbBlogData) {
      res.status(404).json({ message: "No blog found with this id" });
      return;
    }

    const blog = dbBlogData.get({ plain: true });

    res.render("blog-page", {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// -------- New Blog form --------
router.get("/blog-form", withAuth, async (req, res) => {
  try {
    res.render("blog-form", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// -------- To Login screen --------
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// -------- To Sign Up screen --------
router.get("/sign-up", (req, res) => {
  res.render("new-user");
});

module.exports = router;
