// Seed database similar to Ruby on Rails style using ES7 async/ await (i.e. no .then)
let Queries = require('../../queries');
let Show = new Queries('shows')

exports.seed = async function (knex, Promise) {
  // Clear out the DB
  await Show.destroyAll()
  // RESET increment
  await Show.resetId()

  // Declare objects to be created
  let suits = {
    name: 'Suits',
    channel: 'USA Network',
    genre: 'Drama',
    explicit: false
  }; 
  
  let got = {
    name: 'Game of Thrones',
    channel: 'HBO',
    genre: 'Fantasy',
    explicit: true
  };

  let southPark = {
    name: 'South Park',
    channel: 'Comedy Central',
    genre: 'Comedy',
    explicit: true
  };

  let madMen = {
    name: 'Mad Men',
    channel: 'AMC',
    genre: 'Drama',
    explicit: false
  };

  // Create entries one by one in relevant order
  await Show.create(suits)
  await Show.create(got)
  await Show.create(southPark)
  await Show.create(madMen)
};
