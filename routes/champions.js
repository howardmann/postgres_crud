let knex = require('../db/knex')
let Queries = require('../db/queries');
let Champion = new Queries('champions')

exports.index = function (req, res, next) {
  Champion.find()
    .then(data => res.json(data))
    .catch(next)
};

exports.create = function (req, res, next) {
  let {name, race_id} = req.body
  Champion.create({name, race_id})
    .then(data => res.json(data))
    .catch(next)
}