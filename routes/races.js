let knex = require('../db/knex')

exports.index = function (req, res, next) {
  knex.raw(`
    SELECT races.name, json_agg(planets.name) AS planets
      FROM races
    LEFT OUTER JOIN planets_races
      ON races.id = planets_races.race_id
    LEFT OUTER JOIN planets
      ON planets.id = planets_races.planet_id
    GROUP BY races.name  
  `)
  .then(data => res.json(data.rows))
  .catch(next)
};

