


let uniqueValidator = require('mongoose-unique-validator'); // npm installed

module.exports = function(app, mongoose){

  //
  // Access our projects table in the database:
  //

  // Defining our mongoose schema for a given project:
  let projectSchema = new mongoose.Schema({
    title: String,
    _id: String,
    owner: String,
    description: String,
    body_data: Array,
  }, {timestamps: true});

  let Project = mongoose.model('Project', projectSchema);


  // Creating a new project:
  app.post('/create-project', (req, res) => {
    console.log("body:")
    console.log(req.body);

    let newProject = new Project(req.body);
    newProject.save(function (err, result) {
      if (err) return console.error(err);
      console.log(' 💾 Saved a new project to the database!');
      res.send(result)
    });
  })

  // Read a project:
  app.get('/read-projects', (req, res) => {
    console.log("\n 🗣 Called to read a project!")

    Project.find(req.query, function (err, result) {
      if (err) return console.error(err);
      console.log(" 💌 Sent  " + result.length + " project to the frontend!")
      res.send(result);
    })
  });

  // Update a project. Takes an object with query information
  app.post('/update-project', (req, res) => {

    console.log("\n 🗣 Called to update an project!")
    let _id = req.body._id;         // The id of the doc we're calling
    let update = req.body.update;   // The updated fields
    
    Project.updateOne({_id: _id}, update, (result) => {
      console.log(" ⬆️ Updated a project!")
      res.send(result);
    })

  });

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