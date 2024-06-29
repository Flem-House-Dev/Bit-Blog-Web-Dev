const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// --- Blog / User -------
User.hasMany(Blog, {
  foreignKey: "author_id",
  as: "blogs",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

// --- Comment / Blog -------

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

// --- Comment / User -------
User.hasMany(Comment, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "author_id",
});

module.exports = { User, Blog, Comment };
