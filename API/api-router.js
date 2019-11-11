const bcrypt = require('bcryptjs');
const router = require('express').Router();

const requiresAuth = require('../middleware/restricted-middleware');

const Users = require('../users/users-model');

router.get('/', (req, res) => {
  res.send("<h1>🚀</h1>");
});


router.post('/register', (req, res) => {
  let userInfo = req.body;

  bcrypt.hash(userInfo.password, 12, (err, hashed) => {
    userInfo.password = hashed;

    Users.add(userInfo)
      .then(saved => {
        res.status(200).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `${user.username} is logged in` });
      } else {
        res.status(401).json({ mesage: "You shall not pass!"});
      }
    })
    .catch(error => {
      console.log('login error', error);
      res.status(500).json(error);
    })
})

router.get('/users', requiresAuth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "We couldn't log you out." })
      } else {
        res.status(200).json({ message: "Logout successful" })
      }
    })
  } else {
    res.status(200).json({ message: "You were never here" })
  }
})

module.exports = router;
