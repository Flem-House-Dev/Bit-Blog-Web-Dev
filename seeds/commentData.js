const { Comment } = require("../models");

const commentData = [
  {
    author_id: 1,
    blog_id: 1,
    post_date: "September 12, 2020",
    text_content: "This is a great introduction to web development!",
  },
  {
    author_id: 2,
    blog_id: 1,
    post_date: "September 13, 2020",
    text_content: "Thank you for this post! Very helpful.",
  },
  {
    author_id: 3,
    blog_id: 2,
    post_date: "February 21, 2021",
    text_content: "CSS Grid makes layout so much easier!",
  },
  {
    author_id: 1,
    blog_id: 3,
    post_date: "March 11, 2021",
    text_content: "ES6 features have really improved my code quality.",
  },
  {
    author_id: 2,
    blog_id: 4,
    post_date: "April 6, 2021",
    text_content: "React is amazing! Thanks for the introduction.",
  },
  {
    author_id: 3,
    blog_id: 5,
    post_date: "May 23, 2021",
    text_content: "This guide to building RESTful APIs is very comprehensive.",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;