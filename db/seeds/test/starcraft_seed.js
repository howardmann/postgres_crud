let knex = require('../../knex.js');

exports.seed = async function (knex, Promise) {
  // ======RACES
  // Clear out the DB
  await knex.raw('DELETE FROM Races')
  // Reset id number
  await knex.raw('ALTER SEQUENCE races_id_seq RESTART WITH 1')
  // Seed
  await knex.raw(`
    INSERT INTO Races (id, name) VALUES
    (1, 'Zerg'),
    (2, 'Protoss'),
    (3, 'Terran'),
    (4, 'Xel Naga');
  `)

  // ======CHAMPIONS
  // Clear out the DB
  await knex.raw('DELETE FROM Champions')
  // Reset id number
  await knex.raw('ALTER SEQUENCE champions_id_seq RESTART WITH 1')
  // Seed
  await knex.raw(`
    INSERT INTO Champions (name, race_id) VALUES
    ('Sarah Kerrigan', 1),
    ('Artanis', 2),
    ('Jim Raynor', 3),
    ('Amon', 4);
  `)

  // ======PLANETS
  // Clear out the DB
  await knex.raw('DELETE FROM Planets')
  // Reset id number
  await knex.raw('ALTER SEQUENCE planets_id_seq RESTART WITH 1')
  // Seed
  await knex.raw(`
    INSERT INTO Planets (id, name) VALUES
    (1, 'Korhal'),
    (2, 'Char'),
    (3, 'Aiur');
  `)

  // ===PLANETS RACES ASSOCIATION
  // Clear out the DB
  await knex.raw('DELETE FROM Planets_Races')
  // Seed
  await knex.raw(`
    INSERT INTO Planets_Races (planet_id, race_id) VALUES
    (1, 3),
    (2, 1),
    (3, 2),
    (3, 1);
  `)

};
