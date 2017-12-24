// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');

describe('#Shows', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /shows should list ALL shows', function (done) {
    chai.request(app)
      .get('/shows')
      .end(function (err, res) {
        let input = res.body
        let actual = [
          {
            id: 1,
            name: 'Suits',
            channel: 'USA Network',
            genre: 'Drama',
            explicit: false
          },
          {
            id: 2,
            name: 'Game of Thrones',
            channel: 'HBO',
            genre: 'Fantasy',
            explicit: true
          },
          {
            id: 3,
            name: 'South Park',
            channel: 'Comedy Central',
            genre: 'Comedy',
            explicit: true
          },
          {
            id: 4,
            name: 'Mad Men',
            channel: 'AMC',
            genre: 'Drama',
            explicit: false
          }
        ]
        expect(input).to.eql(actual)
        done();
      });
  });

  it('GET /shows/:id should list a SINGLE show', function(done){
    chai.request(app)
      .get('/shows/1')
      .end(function(err, res){
        let input = res.body
        let actual = [{
          id: 1,
          name: 'Suits',
          channel: 'USA Network',
          genre: 'Drama',
          explicit: false,
          comments: [{ id: 1, show_id: 1, description: 'Suits is the best', rating: 5 }]
        }]
        expect(input).to.eql(actual)
        done()
      })
  })

  it('GET /showsName/:name should list ALL matching row', function(done){
    chai.request(app)
      .get('/showsName/suits')
      .end(function(err, res){
        let input = res.body
        let actual = [{
          id: 1,
          name: 'Suits',
          channel: 'USA Network',
          genre: 'Drama',
          explicit: false
        }]
        expect(input).to.eql(actual)
        done()
      })
  })

  it('POST /shows should create a SINGLE show', function(done){
    let mrRobot = {
      name: 'Mr Robot',
      channel: 'USA Network',
      genre: 'Drama',
      explicit: true
    }
    chai.request(app)
      .post('/shows')
      .send(mrRobot)
      .end(function(err, res){
        mrRobot.id = 5
        let input = res.body
        let actual = mrRobot
        expect(input).to.eql(actual)
        done()
      })
  })

  it('PUT /shows/:id should update a SINGLE show', function(done){
    chai.request(app)
      .put('/shows/1')
      .send({
        name: 'Suits 2'
      })
      .end(function(err, res){
        let input = res.body[0]
        let actual = {
          id: 1,
          name: 'Suits 2',
          channel: 'USA Network',
          genre: 'Drama',
          explicit: false
        }
        expect(input).to.eql(actual)
        done()
      })
  })

  it('DELETE /shows/:id should delete a SINGLE show', function(done){
    chai.request(app)
      .delete('/shows/1')
      .end(function(err, res){
        chai.request(app)
          .get('/shows')
          .end(function(err, res){
            let input = res.body.length
            let actual = 3
            expect(input).to.equal(actual)
            done()
          })
      })
  })

  it('GET /showsTopics should return all shows and related topic', function(done){
    chai.request(app)
      .get('/showsTopics')
      .end(function (err, res) {
        let input = res.body
        let actual = [{
          id: 1,
          name: 'Suits',
          channel: 'USA Network',
          genre: 'Drama',
          explicit: false,
          topics: [null]
        },
        {
          id: 3,
          name: 'South Park',
          channel: 'Comedy Central',
          genre: 'Comedy',
          explicit: true,
          topics: ['Funny']
        },
        {
          id: 4,
          name: 'Mad Men',
          channel: 'AMC',
          genre: 'Drama',
          explicit: false,
          topics: ['Funny', 'Dramatic']
        },
        {
          id: 2,
          name: 'Game of Thrones',
          channel: 'HBO',
          genre: 'Fantasy',
          explicit: true,
          topics: ['Dramatic', 'Powerful']
        }]
        expect(input).to.eql(actual)
        done()
      })
  })


});