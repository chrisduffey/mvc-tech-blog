const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ message: 'Failed to create user. Please check your input and try again.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(400).json({ message: 'The email or password you have used is invalid.' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'The email or password you have used is invalid.' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Welcome!' });
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(400).json({ message: 'Failed to log in. Please check your credentials and try again.' });
  }
});

module.exports = router;