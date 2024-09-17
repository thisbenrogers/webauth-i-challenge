const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require('morgan');
const session = require('express-session');

const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe.!',
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false, // TODO READ GDPR laws
};

module.exports = server => {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};