const { Blog } = require("../models");

const blogData = [
  {
    title: "Hello World",
    author_id: 1,
    post_date: "August 9, 2020",
    content: "Yo momma so fat, she jumped up the the air and got stuck.",
  },
  {
    title: "Yo Momma So Lazy",
    author_id: 1,
    post_date: "June 15, 2021",
    content: "Yo momma so lazy, she waits for the couch to come to her.",
  },
  {
    title: "Yo Momma So Ugly",
    author_id: 1,
    post_date: "March 3, 2022",
    content:
      "Yo momma so ugly, when she walks into a bank, they turn off the cameras.",
  },
  {
    title: "Yo Momma So Stupid",
    author_id: 1,
    post_date: "November 11, 2021",
    content:
      'Yo momma so stupid, she stared at a cup of orange juice for 12 hours because it said "concentrate".',
  },
  {
    title: "Yo Momma So Poor",
    author_id: 1,
    post_date: "September 7, 2022",
    content: "Yo momma so poor, she can't even pay attention.",
  },
  {
    title: "Yo Momma So Old",
    author_id: 1,
    post_date: "January 20, 2023",
    content: "Yo momma so old, her social security number is 1.",
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
