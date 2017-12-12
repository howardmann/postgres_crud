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
  .post('/shows', shows.create)
  .get('/shows/:id', shows.show)
  .put('/shows/:id', shows.update)
  .delete('/shows/:id', shows.delete)

module.exports = router;