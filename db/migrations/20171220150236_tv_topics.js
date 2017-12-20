
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function (table) {
    table.increments('id');
    table.string('name').notNullable();
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');  
};
