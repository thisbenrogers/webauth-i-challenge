const router = require('express').Router();

const authRouter = require('../users/auth-router.js');
// const usersRouter = require('../users/users-router.js');

router.use('/auth', authRouter);
// router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.send("<h1>🚀</h1>");
});

module.exports = router;
