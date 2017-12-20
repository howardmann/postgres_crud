
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shows_topics', function (table) {
    table.increments('id');
    table.integer('show_id').unsigned().references('shows.id').onDelete('set null');
    table.integer('topic_id').unsigned().references('topics.id').onDelete('set null');    
  });    
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shows_topics');
};
