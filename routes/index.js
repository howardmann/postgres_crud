var express = require('express');
var router = express.Router();

// Home page
router.get('/', (req, res, next) => {
  res.json({status: 'ok'})
})
// // Races CRUD
let races = require('./races.js');
router
  .get('/races', races.index)
  .get('/races/:id', races.show)
  .post('/races', races.create)
  .put('/races/:id', races.update)


  // // Champions CRUD
let champions = require('./champions.js');
router
  .get('/champions', champions.index)
  .post('/champions', champions.create)


module.exports = router;