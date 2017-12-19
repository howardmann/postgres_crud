let Queries = require('../db/queries');
let Show = new Queries('shows')
let Comment = new Queries('comments')
let knex = require('../db/knex')

exports.index = function (req, res, next) {
  Show.find()
    .then(data => res.json(data))
    .catch(next)
};

exports.create = function (req, res, next) {
  Show.create(req.body)
    .then(data => res.json(data))
    .catch(next);
};

exports.show = function (req, res, next) {
  Show.findByIdJoin(req.params.id, 'comments')
    .then(result => res.send(result))
    .catch(next)
};


exports.update = function (req, res, next) {
  Show.update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(next);
};

exports.delete = function (req, res, next) {
  Show.delete(req.params.id)
    .then(data => res.json(data))
    .catch(next);
};