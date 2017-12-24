let Race = require('../models/race');

exports.index = function (req, res, next) {
  Race.find()  
    .then(data => res.json(data))
    .catch(next)
};

exports.show = function (req, res, next) {
  Race.findById(req.params.id)    
    .then(data => res.json(data))
    .catch(next)  
}

exports.update = function (req, res, next) {
  let {name, planet_id} = req.body
  let raceId = req.params.id
  
  Race.attachPlanets(raceId, planet_id)
    .then(() => Race.update(raceId, { name }))    
    .then(() => res.redirect(`/races/${raceId}`))
    .catch(next)
}

exports.create = function (req, res, next) {
  let { name, planet_id } = req.body
  Race.create({name})  
    .then(data => Race.attachPlanets(data.id, planet_id))
    .then((raceId) => res.redirect(`/races/${raceId}`))
    .catch(next)
}