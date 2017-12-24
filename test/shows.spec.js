// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');

describe('#Races', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /races should list ALL races and associated planets', function (done) {
    chai.request(app)
      .get('/races')
      .end(function (err, res) {
        let input = res.body
        let actual = [
          {
            name: "Zerg",
            planets: [
              "Char",
              "Aiur"
            ]
          },
          {
            name: "Xel Naga",
            planets: [
              null
            ]
          },
          {
            name: "Protoss",
            planets: [
              "Aiur"
            ]
          },
          {
            name: "Terran",
            planets: [
              "Korhal"
            ]
          }
        ]
        expect(input).to.eql(actual)
        done();
      });
  });

});