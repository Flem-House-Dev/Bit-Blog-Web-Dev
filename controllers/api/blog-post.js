const router = require("express").Router();
const { Blog, User } = require("../../models");

// ---- Create a new blog post ----
router.post("/", async (req, res) => {
  try {
    const newBlogPost = await Blog.create({
      ...req.body,
      author_id: req.session.user_id,
      post_date: new Date(),
    });

    res.status(201).json(newBlogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ---- Update an existing blog post ----
router.put("/:id", async (req, res) => {
  try {


    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        author_id: req.session.user_id,
      },
    });

    if (!blogData[0]) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---- Delete an existing blog post ----
router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        author_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
