


let uniqueValidator = require('mongoose-unique-validator'); // npm installed

module.exports = function(app, mongoose){

  //
  // Access our projects table in the database:
  //

  // Defining our mongoose schema for a given project:
  let projectSchema = new mongoose.Schema({
    title: String,
    _id: String,
    id: {
      type: String, 
      lowercase: true, 
      unique: true, // Only available bc of our plugin
      required: [true, "can't be blank"], 
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
      index: true
    },
    owner: String,
    description: String,
    collectionData: Array,
  });

  let Project = mongoose.model('Project', projectSchema);


  // Creating a new project:
  app.post('/create-project', (req, res) => {
    let newProject = new Project(req.body);
    newProject.save(function (err, result) {
      if (err) return console.error(err);
      console.log(' 💾 Saved a new project to the database!');
      res.send(result)
    });
  })

  // Read a project:
  app.get('/read-project', (req, res) => {
    console.log("\n 🗣 Called to read a project!")
    console.log(req.query);

    Project.find(req.query, function (err, result) {
      if (err) return console.error(err);
      console.log(" 💌 Sent  " + result.length + " project to the frontend!")
      res.send(result);
    })
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