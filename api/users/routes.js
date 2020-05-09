



export default function () {
  

  // Creating a new user:
  app.post('/user/create', (req, res) => {

    console.log("\n 🇳🇱 /user/create called")

    console.log("User's page:");
    let newUser = new User({
      display_name: req.body.display_name,
      id: req.body.id,
      email: req.body.email,
      body_data: req.body.body_data,
      bio: '',
      pfp: '',
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

  // Update a user. Takes an object with query information
  app.post('/update-user', (req, res) => {

    console.log("\n 🗣 Called to update a user!")
    let _id = req.body._id;         // The id of the doc we're calling
    let update = req.body.update;   // The updated fields
    console.log(update)
    
    User.updateOne({_id: ObjectID(_id)}, update, (result) => {
      console.log(" ⬆️ Updated an user!")
      console.log(result)
      res.send(result);
    })

  });

  // Logging user in, returning their hash:
  app.post('/login', (req, res) => {
    console.log("\n 🗣 Called to log a user in!")

    // Finding the user
    let id = req.body.id;
    console.log("Searching id:", id);
    User.find({ id: id }, (err, result) => {
      let found_user = result[0];

      // Handling if no user was found:
      if (!found_user) {
        console.log("No users found :/ ")
        res.send(result);
        return [];
      } else {
        console.log("Found user: " + found_user.id);
      }

      // Validating & returning pass
      let submitted_pass = req.body.password;
      // pbkdf2 is a crypto method that comes w Node
      let pass_hash = crypto.pbkdf2Sync(submitted_pass, 
        found_user.salt, 
        10000, 
        512, 
        'sha512').toString('hex');
      if (pass_hash == found_user.hash) {
        console.log("Logged in!");
        res.send({
           token: pass_hash 
        });
      } else {
        console.log("Failed authentication")
        res.send('Authentication failed! :/');
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
        console.log("Found user: " + found_user.id);
        res.send({
          user: found_user 
        });
      }
    });
  });

  // Queries users:
  app.get('/query-users', (req, res) => {
    console.log("\n 🗣 Called to query users!")

    User.find(req.query, function (err, result) {
      if (err) return console.error(err);
      console.log(" 💌 Sent  " + result.length + " users to the frontend!")
      res.send(result);
    })
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