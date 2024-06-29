const { Comment } = require("../models");

const commentData = [
  {
    author_id: 1,
    blog_id: 1,
    post_date: "September12, 2005",
    text_content: "How do you know that?",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;