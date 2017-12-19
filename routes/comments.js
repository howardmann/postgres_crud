let Queries = require('../db/queries');
let Comment = new Queries('comments')

exports.index = function (req, res, next) {
  Comment.find()
    .then(data => res.json(data))
    .catch(next)
};

exports.create = function (req, res, next) {
  Comment.create(req.body)
    .then(data => res.json(data))
    .catch(next);
};

exports.show = function (req, res, next) {
  Comment.findById(req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next);
};

exports.update = function (req, res, next) {
  Comment.update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(next);
};

exports.delete = function (req, res, next) {
  Comment.delete(req.params.id)
    .then(data => res.json(data))
    .catch(next);
};