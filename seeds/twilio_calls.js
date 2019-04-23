
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('twilio_call').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('twilio_call').insert({id: 1, createdAt: knex.fn.now()}),
        knex('twilio_call').insert({id: 2, createdAt: knex.fn.now()}),
        knex('twilio_call').insert({id: 3, createdAt: knex.fn.now()})
      ]);
    });
};
