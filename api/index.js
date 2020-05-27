

/*

  ╦═════════════════════════════════════════════╦
  ⇢ Welcome to the Express server, aka the API! ⇠
  ╚═════════════════════════════════════════════╝	

            ═════ What this is: ═════

        This is a normal Javascript file 
            that runs on the server. 
  
      This script uses this npm package: 
                 > ExpressJS <

             ExpressJS lets us host 
      a program called an "API" on the server. 
   
        The API is like a "network port",
     to let the server talk to other computers.

*/



console.log(" 🌈🏠 Initializing Rooftop server...")
// console.log("Yr env is: " +  process.env.NODE_ENV)



const fs = require('fs');               // GridFS lets Mongo upload files

/* We use a database program called MongoDB */
const mongodb = require('mongodb');     // Importing the MongoDB npm library

/* Mongoose is a program to make mongodb 
  "object oriented", which is a better way
  to organize  data. */
let mongoose = require('mongoose');     // Mongoose gives us object oriented tools, like schema defining

/* This is a data structure that lets us
   define a "schema" for a database. */
const Schema = mongoose.Schema;         

/* Idk what this does */
mongoose.set('useCreateIndex', true); // Resolves a deprecation issue.

/* Lets us run the API */
let express = require('express');       // The Express library

/* Ehhh not sure we need this */
let ObjectID = mongodb.ObjectID;        // This tool lets us convert object id's to be queryable

/* Imports to other api files. 
   We run these imports at the bottom of this file. 
   (Maybe there's a better way to do this?) */
const routes = require('./routes.js');




/*    Setting up Express:   */

/* Creating our Express object instance: */
const app = express()         

/* Telling Nuxt to access the API with /api/ routes */
module.exports = { path: '/api', handler: app } 

// Enabling CORS:
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Getting the server IP. todo: use env variables and auth to make this more secure.

// If we're in development mode, we connect to mLabs. 
// In production mode, we connect to the server's DB. 
let db_url;
if (process.env.NODE_ENV == 'development') {
  db_url = 'mongodb://user:password1@ds021650.mlab.com:21650/rooftop-db';
} else if (process.env.NODE_ENV == 'production') {
  db_url = 'mongodb://127.0.0.1:27017/rooftop-prod'
}
console.log(" ℹ️ You are running the " + process.env.NODE_ENV + " server.");



//    Connecting to mongoose 

mongoose.connect(db_url, { 
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Connecting to our sample database:
db.once('open',
function (err, client) {
  
  if (err) throw err;
  console.log(" 🔗⚡️ Connected to database!")

  // These let express parse json
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Initializing the article routes
  console.log("⇢ Hope these routes go well");
  routes(app, mongoose);

  // Defining our mongoose schema for a given collection:
  /*
  let location_schema = new mongoose.Schema({
    name: String,
    id: String,
    root_element: { type: Schema.Types.ObjectId, ref: 'Element' },
  });

  let Location = mongoose.model('Location', location_schema);
  */


  // Creating a new collection:
  /*
  app.post('/create-collection', (req, res) => {
    let newCollection = new Collection(req.body);
    newCollection.save(function (err, result) {
      if (err) return console.error(err);
      console.log(' 💾 Saved a new collection to the database!');
      res.send(result)
    });
  })*/

  // // See all routes, for debugging
  // app._router.stack.forEach(function(r){
  //   if (r.route && r.route.path){
  //     console.log(r.route.path)
  //   }
  // })

})