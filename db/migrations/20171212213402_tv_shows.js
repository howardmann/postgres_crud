exports.up = function(knex, Promise) {
  return knex.schema.createTable('shows', function (table) {
    table.increments('id');
    table.string('name').notNullable().unique();
    table.string('channel').notNullable();
    table.string('genre').notNullable();
    table.boolean('explicit').notNullable();
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shows');  
};
