const db = require('../data/dbconfig');

module.exports = {
  find,
  findBy,
  add
};

function find() {
  return blur('users').select('id', 'username');
}

function findBy(filter) {
  return db('users').where(filter);
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findBy(id);
    })
}