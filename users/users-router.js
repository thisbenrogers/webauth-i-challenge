const router = require('express').Router();

const Users = require('./users-model');
const requiresAuth = require('../middleware/restricted-middleware');

router.get('/', requiresAuth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
})

module.exports = router;