// Seed database similar to Ruby on Rails style using ES7 async/ await (i.e. no .then)
let Queries = require('../../queries');
let Show = new Queries('shows')
let Comment = new Queries('comments')
let Topic = new Queries('topics')
let ShowTopic = new Queries('shows_topics')

exports.seed = async function (knex, Promise) {
  // Clear out the DB
  await Show.destroyAll()
  // RESET increment
  await Show.resetId()

  // Declare objects to be created
  let suitsData = {
    name: 'Suits',
    channel: 'USA Network',
    genre: 'Drama',
    explicit: false
  };

  let gotData = {
    name: 'Game of Thrones',
    channel: 'HBO',
    genre: 'Fantasy',
    explicit: true
  };

  let southParkData = {
    name: 'South Park',
    channel: 'Comedy Central',
    genre: 'Comedy',
    explicit: true
  };

  let madMenData = {
    name: 'Mad Men',
    channel: 'AMC',
    genre: 'Drama',
    explicit: false
  };

  // Create entries one by one in relevant order
  let suits = await Show.create(suitsData)
  let got = await Show.create(gotData)
  let southPark = await Show.create(southParkData)
  let madMen = await Show.create(madMenData)

  // Clear out the DB
  await Comment.destroyAll()
  // RESET increment
  await Comment.resetId()
  
  // Declare objects to be created
  let suitsCommentData = {
    description: 'Suits is the best',
    rating: 5
  };

  let gotCommentData = {
    description: 'GoT is the greatest show on earth',
    rating: 4
  };

  let southParkCommentData = {
    description: 'I hate south park',
    rating: 1
  };

  let southParkCommentData2 = {
    description: 'South Park rocks',
    rating: 4
  };

  // Create entries one by one in relevant order
  let suitsComment = await Comment.create(suitsCommentData)
  let gotComment = await Comment.create(gotCommentData)
  let southParkComment = await Comment.create(southParkCommentData)
  let southParkComment2 = await Comment.create(southParkCommentData2)

  // Make associations
  await Comment.update(suitsComment.id, {show_id: suits.id})
  await Comment.update(gotComment.id, {show_id: got.id})
  await Comment.update(southParkComment.id, {show_id: southPark.id})
  await Comment.update(southParkComment2.id, {show_id: southPark.id})

  // Clear out the DB
  await Topic.destroyAll()
  // RESET increment
  await Topic.resetId()
  let funny = await Topic.create({name: 'Funny'})
  let scary = await Topic.create({name: 'Scary'})
  let powerful = await Topic.create({name: 'Powerful'})
  let dramatic = await Topic.create({name: 'Dramatic'})

  await ShowTopic.destroyAll()
  await ShowTopic.create({show_id: southPark.id, topic_id: funny.id})
  await ShowTopic.create({show_id: got.id, topic_id: dramatic.id})
  await ShowTopic.create({show_id: got.id, topic_id: powerful.id})
  await ShowTopic.create({show_id: madMen.id, topic_id: funny.id})
  await ShowTopic.create({show_id: madMen.id, topic_id: dramatic.id})
};
