const bcrypt = require('bcryptjs');
const router = require('express').Router();

// const authRouter = require('../auth/auth-router.js');
// const usersRouter = require('../users/users-router.js');

// router.use('/auth', authRouter);
// router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.send("<h1>🚀</h1>");
});

router.post('/hash', (req, res) => {
  const { password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  res.status(200).json({ password, hash });
});

module.exports = router;
