const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model');

router.get('/', (req, res) => {
  res.json('<h1>✨</h1>')
})

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

module.exports = router;