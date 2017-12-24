var express = require('express');
var router = express.Router();

// Home page
router.get('/', (req, res, next) => {
  res.json({status: 'ok'})
})
// // Shows CRUD
var shows = require('./shows.js');
router
  .get('/shows', shows.index)
  .get('/showsName/:name', shows.name)
  .get('/showsTopics', shows.showTopics)
  .post('/shows', shows.create)
  .get('/shows/:id', shows.show)
  .put('/shows/:id', shows.update)
  .delete('/shows/:id', shows.delete)

  // // Comments CRUD
var comments = require('./comments.js');
router
  .get('/comments', comments.index)
  .post('/comments', comments.create)
  .get('/comments/:id', comments.show)
  .put('/comments/:id', comments.update)
  .delete('/comments/:id', comments.delete)

module.exports = router;