// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');
let Queries = require('../db/queries');
let Show = new Queries('shows')

describe('#Comments', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /shows should list ALL comments', function (done) {
    chai.request(app)
      .get('/comments')
      .end(function (err, res) {
        let input = res.body
        let actual = [
          {
            id: 1,
            description: 'Suits is the best',
            rating: 5,
            show_id: 1
          },
          {
            id: 2,
            description: 'GoT is the greatest show on earth',
            rating: 4,
            show_id: 2
          },
          {
            id: 3,
            description: 'I hate south park',
            rating: 1,
            show_id: 3
          },
          {
            id: 4,
            description: 'South Park rocks',
            rating: 4,
            show_id: 3
          }
        ]
        expect(input).to.eql(actual)
        done();
      });
  });

  it('GET /comments/:id should list a SINGLE comment', function (done) {
    chai.request(app)
      .get('/comments/1')
      .end(function (err, res) {
        let input = res.body
        let actual = {
          id: 1,
          description: 'Suits is the best',
          rating: 5,
          show_id: 1
        }
        expect(input).to.eql(actual)
        done()
      })
  })

  it('POST /comments should create a SINGLE comment', function (done) {
    Show.findBy('name', 'Game of Thrones')
      .then(result => {
        let show = result[0] 
        return {
          description: 'GoT is terrible',
          rating: 1,
          show_id: show.id
        }
      })
      .then(gotComment => {
        chai.request(app)
          .post('/comments')
          .send(gotComment)
          .end(function (err, res) {
            let input = res.body
            let actual = gotComment
            expect(input).to.contain(actual)
            done()
          })
      })
  })

  it('PUT /comments/:id should update a SINGLE comment', function (done) {
    chai.request(app)
      .put('/comments/1')
      .send({
        description: 'Miaow'
      })
      .end(function (err, res) {
        let input = res.body[0]
        let actual = {
          id: 1,
          description: 'Miaow',
          rating: 5,
          show_id: 1
        }
        expect(input).to.eql(actual)
        done()
      })
  })

  it('DELETE /comments/:id should delete a SINGLE comment', function (done) {
    chai.request(app)
      .delete('/comments/1')
      .end(function (err, res) {
        chai.request(app)
          .get('/comments')
          .end(function (err, res) {
            let input = res.body.length
            let actual = 3
            expect(input).to.equal(actual)
            done()
          })
      })
  })


});