
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contacts').insert({id: 1, name: 'nick', createdAt: knex.fn.now()}),
        knex('contacts').insert({id: 2, name: 'mike', createdAt: knex.fn.now()}),
        knex('contacts').insert({id: 3, name: 'greg', createdAt: knex.fn.now()})
      ]);
    });
};
