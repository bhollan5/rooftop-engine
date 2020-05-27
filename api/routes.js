
/*
let crypto = require('crypto');  // comes as a default in npm

let uniqueValidator = require('mongoose-unique-validator'); // npm installed
let jwt = require('jsonwebtoken');  // npm installed, but not used! todo: uninstall

let ObjectID = require('mongodb').ObjectID; // for comparing with object id's
*/
// Using this tutorial a lot on this file: https://thinkster.io/tutorials/node-json-api/creating-the-user-model 


module.exports = function(app, mongoose){

  console.log("Initializing the routes!");
  //
  // Access our users in the database:
  //

  // Defining our mongoose schema for a given user:
  /*
  let userSchema = new mongoose.Schema({
    id: {
      type: String, 
      lowercase: true, 
      unique: true, // Only available bc of our plugin
      required: [true, "can't be blank"], 
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
      index: true
    },
    email: {
      type: String, 
      lowercase: true, 
      unique: true, // Only available bc of our plugin
      required: [true, "can't be blank"], 
      match: [/\S+@\S+\.\S+/, 'is invalid'], 
      index: true
    },
    display_name: String,
    bio: String,
    pfp: String,
    current_theme: String,

    body_data: Array,

    hash: String,
    salt: String
  }, {timestamps: true});
  */

  // Adding our imported library to this schema, so we can use the 'unique' validator
  // userSchema.plugin(uniqueValidator, { message: ' is already taken as a id!' });

  // Adding a hashing function for user's passwords:
  /*
  userSchema.methods.setPassword = function(password){

    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(
      password, 
      this.salt, 
      10000, 
      512, 
      'sha512'
    ).toString('hex');

    console.log(" 🔏 Stored hash & salt for new password!")
  };


  let User = mongoose.model('Users', userSchema);
  */

  app.get('/read-user', (req, res) => {
    res.send('felix');
  });

  // Getting a user based on their password token (stored locally to keep people logged in)
  app.get('/read_doc', (req, res) => {
    console.log("\n 🗣 ⎔ Hello!! read_doc has been called ")
    res.send('response from server');
    //
    /*
    User.find({ hash: token }, (err, result) => {
      let found_user = result[0];

      // Handling if no user was found:
      if (!found_user) {
        console.log("No users found :/ ")
        res.send(result);
        return [];
      } else {
        console.log("Found user: " + found_user.id);
        res.send({
          user: found_user 
        });
      }
    });*/

  });

}