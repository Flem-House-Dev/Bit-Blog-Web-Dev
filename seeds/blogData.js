const { Blog } = require("../models");

const blogData = [
  {
    title: "Introduction to Web Development",
    author_id: 1,
    post_date: "January 15, 2020",
    content: "Web development is a fast-growing field that involves creating websites and web applications. This post will introduce you to the basics of web development, including HTML, CSS, and JavaScript.",
  },
  {
    title: "Understanding CSS Grid",
    author_id: 2,
    post_date: "February 20, 2021",
    content: "CSS Grid is a powerful layout system available in CSS. It allows you to create complex, responsive layouts with ease. In this post, we will cover the fundamentals of CSS Grid and how you can use it in your projects.",
  },
  {
    title: "JavaScript ES6 Features",
    author_id: 1,
    post_date: "March 10, 2021",
    content: "ES6 brought a lot of new features to JavaScript, making it more powerful and easier to work with. This post will explore some of the most important ES6 features, including arrow functions, classes, and template literals.",
  },
  {
    title: "Getting Started with React",
    author_id: 3,
    post_date: "April 5, 2021",
    content: "React is a popular JavaScript library for building user interfaces. This post will help you get started with React, covering the basics of components, state, and props.",
  },
  {
    title: "Building RESTful APIs with Node.js",
    author_id: 2,
    post_date: "May 22, 2021",
    content: "Node.js is a powerful runtime environment for building server-side applications. In this post, we will learn how to build RESTful APIs using Node.js and Express, a popular Node.js framework.",
  }
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
