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

})

module.exports = router;