let knex = require('../db/knex')
let Queries = require('../db/queries');
let Race = new Queries('races')
let PlanetRace = new Queries('planets_races')

let getRaceById = (raceId) => {
  return knex.raw(`
    SELECT races.*, json_agg(planets.name) AS planets, json_agg(DISTINCT champions.name) AS champions
      FROM races
    LEFT OUTER JOIN champions
      ON races.id = champions.race_id
    LEFT OUTER JOIN planets_races
      ON races.id = planets_races.race_id
    LEFT OUTER JOIN planets
      ON planets.id = planets_races.planet_id
    WHERE races.id = ${raceId}
    GROUP BY races.id     
  `)
}

let getRaces = () => {
  return knex.raw(`
    SELECT races.name, json_agg(planets.name) AS planets
      FROM races
    LEFT OUTER JOIN planets_races
      ON races.id = planets_races.race_id
    LEFT OUTER JOIN planets
      ON planets.id = planets_races.planet_id
    GROUP BY races.name  
  `)  
}

let updateRacePlanet = (raceId, planetIdArr) => {
  let updateQueryArr = planetIdArr.map(planetId => knex.raw(`INSERT INTO planets_races (race_id, planet_id) VALUES (${raceId}, ${planetId})`))
  return new Promise(resolve => {
    if (planetIdArr.length === 0) {
      resolve()
    }
    // Delete associations and then rebuild
    knex.raw(`DELETE FROM planets_races WHERE race_id = ${raceId}`)
      .then(() => Promise.all(updateQueryArr))
      .then(() => resolve(raceId))
  })
}

exports.index = function (req, res, next) {
  getRaces()  
    .then(data => res.json(data.rows))
    .catch(next)
};

exports.show = function (req, res, next) {
  getRaceById(req.params.id)    
    .then(data => res.json(data.rows))
    .catch(next)  
}

exports.update = function (req, res, next) {
  let {name, planet_id} = req.body
  let raceId = req.params.id
  
  updateRacePlanet(raceId, planet_id)
    .then(() => Race.update(raceId, { name }))    
    .then(() => res.redirect(`/races/${raceId}`))
    .catch(next)
}