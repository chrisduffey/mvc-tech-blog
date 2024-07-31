const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    // Create a new user
    const userData = await User.create(req.body);

    // Save user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ message: "Failed to create user. Please check your input and try again." });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log("No user found");
      return res.status(400).json({ message: "The email or password you have used is invalid." });
    }

    // Check the password
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("Password does not match");
      return res.status(400).json({ message: "The email or password you have used is invalid." });
    }

    // Save user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Welcome!" });
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(400).json({ message: "Failed to log in. Please check your credentials and try again." });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res.status(500).json({ message: "Failed to log out. Please try again." });
      }
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: "No user session found." });
  }
});

module.exports = router;