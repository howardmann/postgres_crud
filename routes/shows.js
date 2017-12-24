let Queries = require('../db/queries');
let Show = new Queries('shows')
let Comment = new Queries('comments')
let knex = require('../db/knex')

exports.index = function (req, res, next) {
  Show.find()
    .then(data => res.json(data))
    .catch(next)
};

exports.showTopics = function (req, res, next) {
  // knex('shows')
  //   .join('shows_topics', 'shows_topics.show_id', 'shows.id')
  //   .join('topics', 'shows_topics.topic_id', 'topics.id')
  //   .select([
  //     'shows.*',
  //     knex.raw('json_agg(topics.*) as topic')
  //   ])
  //   .groupBy('shows.id')
  //   .then(data => res.json(data))
  //   .catch(next)  
  
  // RAW SQL
  knex.raw(`
    SELECT Shows.*, json_agg(Topics.name) as topics 
    FROM Shows
    LEFT OUTER JOIN Shows_Topics
    ON shows_topics.show_id = shows.id
    LEFT OUTER JOIN Topics
    ON shows_topics.topic_id = topics.id    
    GROUP BY shows.id
  `)
  .then(data => res.json(data.rows))
  .catch(next)
}

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

exports.name = function (req, res, next) {
  Show.findBy('name', req.params.name)
    .then(result => res.send(result))
    .catch(next)
}

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