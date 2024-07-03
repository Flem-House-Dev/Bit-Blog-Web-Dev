const { User } = require("../models");
const bcrypt = require("bcrypt");

const userData = [
  {
    username: "testuser1",
    email: "user1@test.com",
    password: "password123",
  },
  {
    username: "testuser2",
    email: "user2@test.com",
    password: "password456",
  },
];

const seedUsers = async () => {
  const hashedUserData = await Promise.all(
    userData.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    })
  );
  await User.bulkCreate(hashedUserData);
};

module.exports = seedUsers;
