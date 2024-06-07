const express = require('express');
const { User } = require('../../models');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy()
            res.status(200).json({ message: 'You are now logged out!' });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        console.log('Signup request body:', req.body);
        const userData = await User.create(req.body);
        console.log('User created:', userData);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Signup unsuccessful. Please try again.' })    }
});

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }

});

module.exports = router;

