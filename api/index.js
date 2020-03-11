// To initialize express in nuxt: 
// https://medium.com/@mitsuyawatanabe/how-to-start-express-project-in-nuxt-2-x-d3406c92a8ca
// https://www.reddit.com/r/vuejs/comments/aayav5/any_examplestutorial_on_a_nuxt_app_with/


const fs = require('fs');               // GridFS lets Mongo upload files
const mongodb = require('mongodb');     // The MongoDB library
let mongoose = require('mongoose');     // Mongoose gives us object oriented tools, like schema defining


let express = require('express');       // The Express library

let ObjectID = mongodb.ObjectID;        // This tool lets us convert object id's to be queryable

// // Disabling this for now, since we're not uploading any files yet. 
// let multer  = require('multer');        // Lets us route new images we're uploading
// let uploadObj = multer({                // This object references the path we want to use
//   dest: './uploads/' 
// })



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
  // Images are a separate schema
  let vectorImageSchema = new mongoose.Schema({
    fileName: String,
    fileValue: String,
  });

  let Article = mongoose.model('Article', articleSchema);
  let VectorImage = mongoose.model('VectorImage', vectorImageSchema);


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

  // File Upload
  // TODO: Instead of fs, consider this - http://menge.io/2015/03/24/storing-small-images-in-mongodb/
  app.post('/upload-article-image', (req, res) => {
    console.log("\n 🗣 Called to upload a file! ")

    let newVectorImage = new VectorImage(req.body);
    newVectorImage.save(function (err, result) {
      if (err) return console.error(err);
      console.log('Saved SVG to database.');
      res.send(result)
    });

  })


})