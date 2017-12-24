var express = require('express');
var router = express.Router();

// Home page
router.get('/', (req, res, next) => {
  res.json({status: 'ok'})
})
// // Races CRUD
var races = require('./races.js');
router
  .get('/races', races.index)


module.exports = router;