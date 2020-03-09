// To initialize express in nuxt: 
// https://medium.com/@mitsuyawatanabe/how-to-start-express-project-in-nuxt-2-x-d3406c92a8ca
// https://www.reddit.com/r/vuejs/comments/aayav5/any_examplestutorial_on_a_nuxt_app_with/


const fs = require('fs');               // GridFS lets Mongo upload files
const mongodb = require('mongodb');     // The MongoDB library
let mongoose = require('mongoose');     // Mongoose gives us object oriented tools, like schema defining


let express = require('express');       // The Express library

let ObjectID = mongodb.ObjectID;        // This tool lets us convert object id's to be queryable

const app = express()                   // Creating our Express instance

module.exports = { path: '/api', handler: app } // lets us access our express paths via /api/

mongoose.connect('mongodb://user:password1@ds021650.mlab.com:21650/rooftop-db', { 
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Connecting to our sample database:
db.once('open',
function (err, client) {
  
  if (err) throw err;
  console.log(" 🔗 Connected to database!")

  // These let express parse json
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //
  // ARTICLE INTERFACING:
  //

  // Defining our mongoose schema for a given article:
  let articleSchema = new mongoose.Schema({
    articleTitle: String,
    articleData: Array,
  });

  let Article = mongoose.model('Article', articleSchema);

  // Creating a new article:
  app.post('/create-article', (req, res) => {
    let newArticle = new Article(req.body);
    newArticle.save(function (err, result) {
      if (err) return console.error(err);
      console.log('saved to database');
      res.send(result)
    });
  })

  // Getting all articles:
  app.get('/articles', (req, res) => {
    console.log("\n 🗣 Called to read all articles!")

    Article.find(function (err, result) {
      if (err) return console.error(err);
      console.log(" 💌 Sent out " + result.length + " results!")
      res.send(result);
    })
  });

  
  // Update an article. Takes an object with query information
  app.post('/update-article', (req, res) => {

    console.log("\n 🗣 Called to update an article!")
    let _id = req.body._id;         // The id of the doc we're calling
    let update = req.body.update;   // The updated fields

    Article.updateOne({_id: _id}, update, (result) => {
      console.log(" ⬆️ Updated an article!")
      res.send(result);
    })

  });

  // Delete an article. Takes an object with an _id 
  app.delete('/delete-article/:_id', (req, res) => {

    let _id = req.params._id; 
    console.log("\n 🗣 Called to delete the article " + _id)

    Article.deleteOne({
      "_id": ObjectID(_id)
    }, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err)
      }
      console.log(" ⛔️ Deleted an article!")
      res.send(result);
    })
  })

  /*

  // Getting an article. Takes an object with query information
  app.get('/read-article', (req, res) => {

    console.log("\n 🗣Called to read an article by query.")
    db.collection('articles').find(req.data).toArray( (err, result) => {
      if (err) {
        console.log(err);
        return err;
      }
  
      res.send(result);
    })
  })


  // Delete an article. Takes an object with an _id 
  app.delete('/delete-article/:_id', (req, res) => {

    let _id = req.params._id; 
    console.log("\n 🗣 Called to delete the article " + _id)

    db.collection('articles').deleteOne({
      "_id": ObjectID(_id)
    }, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err)
      }
      console.log(" ⛔️ Deleted an article!")
      res.send(result);
    })
  })

  // Uploading files:
  var bucket = new mongodb.GridFSBucket(db);
  app.post('/upload-image', (req, res) => {
    fs.createReadStream('./my-pic.svg').
    pipe(bucket.openUploadStream('my-pic.svg')).
    on('error', function(error) {
      assert.ifError(error);
    }).
    on('finish', function() {
      console.log('done!');
      process.exit(0);
    });

  })*/

})