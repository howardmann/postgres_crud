// Dependencies
let knex = require('./knex.js');

// Queries factory function which requires table name
let Queries = function(table){
  let Table = () => knex(table)

  this.find = () => Table().select()
  this.findById = (id) => Table().where('id', parseInt(id)).first()
  this.create = (body) => Table().insert(body).returning('*')
  this.update = (id, updates) => Table().where('id', parseInt(id)).update(updates).returning('*')
  this.delete = (id) => Table().where('id', parseInt(id)).del()
  this.destroyAll = () => Table().del()
  this.resetId = () => knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)
}

module.exports = Queries