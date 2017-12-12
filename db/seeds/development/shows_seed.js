// Seed database similar to Ruby on Rails style using ES7 async/ await (i.e. no .then)
let Queries = require('../../queries');
let Show = new Queries('shows')

exports.seed = async function(knex, Promise) {
  // Clear out the DB
  await Show.destroyAll()

  // Declare objects to be created
  let suits = {
    name: 'Suits',
    channel: 'USA Network',
    genre: 'Drama',
    rating: 3,
    explicit: false
  }; 
  
  let got = {
    name: 'Game of Thrones',
    channel: 'HBO',
    genre: 'Fantasy',
    rating: 5,
    explicit: true
  };

  let southPark = {
    name: 'South Park',
    channel: 'Comedy Central',
    genre: 'Comedy',
    rating: 4,
    explicit: true
  };

  let madMen = {
    name: 'Mad Men',
    channel: 'AMC',
    genre: 'Drama',
    rating: 3,
    explicit: false
  };

  // Create entries one by one in relevant order
  await Show.create(suits)
  await Show.create(got)
  await Show.create(southPark)
  await Show.create(madMen)
};
