
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id');
    table.integer('show_id').unsigned().references('shows.id').onDelete('set null');;
    table.string('description').notNullable();
    table.integer('rating').notNullable();
  });  
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');    
};

