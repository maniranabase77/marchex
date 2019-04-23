
exports.up = function(knex, Promise) {
	
	  return knex.schema.createTable('twilio_call', function(t) {
    t.increments('id').unsigned().primary();
    t.dateTime('createdAt').notNull();
    t.string('requestid').nullable();
    t.string('message').nullable();
    t.string('call_status').nullable();
	t.string('reason').nullable();
	t.string('recommendation').nullable();
	t.string('code').nullable();
  });
};

exports.down = function(knex, Promise) {
	
	   return knex.schema.dropTable('twilio_call');
  
};
