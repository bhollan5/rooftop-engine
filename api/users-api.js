

let crypto = require('crypto');  // comes as a default in npm

let uniqueValidator = require('mongoose-unique-validator'); // npm installed
let jwt = require('jsonwebtoken');  // npm installed, but not used! todo: uninstall

let secret = require('../config').secret; // in the ./config file, which you may need to  add

// Using this tutorial a lot on this file: https://thinkster.io/tutorials/node-json-api/creating-the-user-model 


module.exports = function(app, mongoose){

  //
  // Access our users in the database:
  //

  // Defining our mongoose schema for a given user:
  let userSchema = new mongoose.Schema({
    username: {
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
    image: String,
    hash: String,
    salt: String
  }, {timestamps: true});

  // Adding our imported library to this schema, so we can use the 'unique' validator
  userSchema.plugin(uniqueValidator, { message: ' is already taken as a username!' });

  // Adding a hashing function for user's passwords:
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

  // Making a JSON Web Token to authenticate that this server should be able to sign people in!
  // More: https://en.wikipedia.org/wiki/JSON_Web_Token
  userSchema.methods.generateJWT = function() {
    let today = new Date();
    // Setting our auth to expire in 60 days:
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    // Returning our signed JWT, along with the secret from ./config
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };

  let User = mongoose.model('Users', userSchema);


  // Creating a new user:
  app.post('/create-user', (req, res) => {
    console.log("\n 🗣 Called to add a user!")
    let newUser = new User({
      display_name: req.body.display_name,
      username: req.body.username,
      email: req.body.email,
      bio: '',
      image: '',
    });
    newUser.setPassword(req.body.password);
    newUser.save(function (err, result) {
      if (err) {
        console.error(err)
        res.status(500).send(err) // Passes the error to the frontend.
      };
      console.log(' 💾 Saved a new user to the database!');
      res.send(result)
    });
  });

  // Logging user in, returning their hash:
  app.post('/login', (req, res) => {
    console.log("\n 🗣 Called to log a user in!")

    // Finding the user
    let username = req.body.username;
    console.log("Searching username:", username);
    User.find({ username: username }, (err, result) => {
      let found_user = result[0];

      // Handling if no user was found:
      if (!found_user) {
        console.log("No users found :/ ")
        res.send(result);
        return [];
      } else {
        console.log("Found user: " + found_user.username);
      }

      // Validating & returning pass
      let submitted_pass = req.body.password;
      // pbkdf2 is a crypto method that comes w Node
      let pass_hash = crypto.pbkdf2Sync(submitted_pass, 
        found_user.salt, 
        10000, 
        512, 
        'sha512').toString('hex');
      if (pass_hash === found_user.hash) {
        console.log("Logged in!");
        res.send({
           token: pass_hash 
        });
      } else {
        console.log("Not logged in.")
        res.status(500).send('Error logging in.');
      }
    });
    
  });

  // Getting a user based on their password token (stored locally to keep people logged in)
  app.get('/read-user', (req, res) => {
    console.log("\n 🗣 Called to read the user!")

    // It took me forever to figure out that nuxt auth sends the token in headers.authorization
    let auth = req.headers.authorization;
    let token = auth.split(' ')[1];

    //
    User.find({ hash: token }, (err, result) => {
      let found_user = result[0];

      // Handling if no user was found:
      if (!found_user) {
        console.log("No users found :/ ")
        res.send(result);
        return [];
      } else {
        console.log("Found user: " + found_user.username);
        res.send({
          user: found_user 
        });
      }
    });
  });

  // Getting a user based on their password token (stored locally to keep people logged in)
  app.delete('/logout', (req, res) => {
    console.log("\n 🗣 Called to log user out!");

    res.send("No actions taken.");
  });
  
  // // Update a collection. Takes an object with query information
  // app.post('/update-collection', (req, res) => {

  //   console.log("\n 🗣 Called to update a collection!")
  //   let _id = req.body._id;         // The id of the doc we're calling
  //   let update = req.body.update;   // The updated fields

  //   Collection.updateOne({_id: _id}, update, (result) => {
  //     console.log(" ⬆️ Updated a collection!")
  //     res.send(result);
  //   })

  // });

  // // Delete an article. Takes an object with an _id 
  // app.delete('/delete-article/:_id', (req, res) => {

  //   let _id = req.params._id; 
  //   console.log("\n 🗣 Called to delete the article " + _id)

  //   Article.deleteOne({
  //     "_id": ObjectID(_id)
  //   }, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.send(err)
  //     }
  //     console.log(" ⛔️ Deleted an article!")
  //     res.send(result);
  //   })
  // })

  // // File Upload - deprecated
  // // TODO: Instead of fs, consider this - http://menge.io/2015/03/24/storing-small-images-in-mongodb/
  // app.post('/upload-article-image', (req, res) => {
  //   console.log("\n 🗣 Called to upload a file! ")

  //   let newVectorImage = new VectorImage(req.body);
  //   newVectorImage.save(function (err, result) {
  //     if (err) return console.error(err);
  //     console.log('Saved SVG to database.');
  //     res.send(result)
  //   });

  // })

}