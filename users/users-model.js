const db = require('../data/dbconfig');

module.exports = {
  find,
  findBy,
  finById,
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
      return findById(id);
    })
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}