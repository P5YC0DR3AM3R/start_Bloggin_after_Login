const express = require('express');
const router = express.Router();

const { Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { userId: req.session.user_id },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('profile', { posts, logged_in: req.session.logged_in });

} catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
  res.render('newPost');
});

router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editPost', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;