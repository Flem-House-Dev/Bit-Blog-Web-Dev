const router = require("express").Router();
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

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ------- Sign up new user -------
router.post("sign-up", async (req,res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// ------- Log out -------
router.post('logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        })
    } else {
        res.status(400).end();
    }
});

module.exports = router;
