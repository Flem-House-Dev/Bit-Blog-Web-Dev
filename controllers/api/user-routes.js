const router = require("express").Router();
const { json } = require("sequelize");
const { User } = require("../../models");

// ------- Login -------
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: "Incorrect email or password." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password." });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;

      res.status(200).json({ message: "You are now logged in!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ------- Sign up new user -------
router.post("/sign-up", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.error(err);
    if (err.name === "SequelizeUniqueConstraintError") {
      // Check which field caused the unique constraint error
      const field = err.errors[0].path;
      if (field === "email") {
        res
          .status(400)
          .json({
            message:
              "This email address is already in use. Please use a different email.",
          });
      } else if (field === "username") {
        res
          .status(400)
          .json({
            message:
              "This username is already taken. Please choose a different username.",
          });
      } else {
        res
          .status(400)
          .json({ message: "This information is already in use." });
      }
    } else if (err.name === "SequelizeValidationError") {
      const formattedErrors = err.errors.map((error) => {
        let message = error.message;
        if (error.validatorKey === "len" && error.path === "password") {
          message = `Password must be between ${error.validatorArgs[0]} and ${error.validatorArgs[1]} characters long`;
        }
        if (error.validatorKey === "isEmail") {
          message = "Please enter a valid email address";
        }
        return `${message}`;
      });
      res
        .status(400)
        .json({
          message: `${formattedErrors}`,
        });
    } else {
      res
        .status(500)
        .json({
          message: "An error ocurred while creating user. Please try again",
        });
    }
  }
});

// ------- Delete user account-------

router.delete("/", async (req, res) => {
  const userId = req.session.user_id;

  try {
    await User.destroy({
      where: {
        id: userId,
      },
    });
    req.session.loggedIn = false;
    res.json({ message: "User deleted successfully" });
    req.session.destroy(() => {
      res.status(200).end();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// ------- Log out -------
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;
