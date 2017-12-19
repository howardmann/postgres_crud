// Dependencies
let knex = require('./knex.js');

// Queries factory function which requires table name
let Queries = function(table){
  let Table = () => knex(table)

  this.find = () => Table().select()
  this.findById = (id) => Table().where('id', parseInt(id)).first()
  this.findBy = (property, name) => Table().where(property, name)
  this.create = (body) => Table().insert(body).returning('*').then(result => result[0])
  this.update = (id, updates) => Table().where('id', parseInt(id)).update(updates).returning('*')
  this.delete = (id) => Table().where('id', parseInt(id)).del()
  this.destroyAll = () => Table().del()
  this.resetId = () => knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)
  
  // Postgresql nested single join query
  this.findByIdJoin = (id, joinTable) => {
    return Table()
            .join(joinTable, `${table}.id`, `${joinTable}.${table.slice(0,-1)}_id`)
            .where(`${table}.id`, id)
            .select([
              `${table}.*`,
              knex.raw(`json_agg(${joinTable}.*) as ${joinTable}`)
            ])
            .groupBy(`${table}.id`)
  }
}

module.exports = Queries