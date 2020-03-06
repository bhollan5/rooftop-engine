// To initialize express in nuxt: 
// https://medium.com/@mitsuyawatanabe/how-to-start-express-project-in-nuxt-2-x-d3406c92a8ca
// https://www.reddit.com/r/vuejs/comments/aayav5/any_examplestutorial_on_a_nuxt_app_with/

let MongoClient = require('mongodb').MongoClient;
let express = require('express');

// For identifying _ids
let ObjectID = require('mongodb').ObjectID;

const app = require('express')()

module.exports = { path: '/api', handler: app }

app.get('/hello', (req, res) => {
    console.log('hello nuxt in text')
    res.send('world')
})


let db;
// Connecting to our sample database:
MongoClient.connect('mongodb://user:password1@ds021650.mlab.com:21650/rooftop-db', 
                      function (err, client) {
  if (err) throw err;
  // the DD variable is now our database!
  db = client.db('rooftop-db');

  // These let express parse json
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //
  // ARTICLE INTERFACING:
  //

  // Posting a new article:
  app.post('/create-article', (req, res) => {
    db.collection('articles').insertOne(req.body, (err, result) => {
      if (err) {
        return err;
      }
      console.log('saved to database')
      res.send(result)
    })
  })

  // Getting all articles - for debugging purposes. 
  app.get('/articles', (req, res) => {
    console.log("\n 🗣 Called to read all articles!")
    
    db.collection('articles').find({}).toArray( (err, result) => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log(" 💌 Sent out " + result.length + " results!")
      res.send(result);
    })
  })

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

  // Update an article. Takes an object with query information
  app.post('/update-article', (req, res) => {

    console.log("\n 🗣 Called to update an article!")
    let _id = req.body._id;         // The id of the doc we're calling
    let update = req.body.update;   // The updated fields


    db.collection('articles').updateOne({
      "_id": ObjectID(_id)
    }, {
      $set: update,
    }, (err, result) => {
      if (err) {
        console.log(err);
        // return err;
      }

      console.log(" ⬆️ Updated an article!")
    })
  })
//   db.collection('articles').updateOne(query, {
//     $set: update
//   }, (err, result) => {
//     if (err) {
//       console.log(err);
//       return err;
//     }

//     console.log(" ⬆️ Updated an article!")
//   })
// })

})