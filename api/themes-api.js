module.exports = function(app, mongoose){

  //
  // Accessing our themes in the database:
  //

  // Defining our mongoose schema for a given article:
  let themeSchema = new mongoose.Schema({
    theme_name: String,
    _id: String,

    thumbnail: String,

    colors: Object

  });

  let Theme = mongoose.model('Theme', themeSchema);


  // Creating a new article:
  app.post('/create-theme', (req, res) => {
    console.log("\n 🗣 Called to create a theme!")

    let update = req.body;
    let id = req.body._id;

      // The upsert option lets us create or update at once. 
    Theme.updateOne({_id: id}, update, {upsert: true}, (result) => {
      console.log(" ⬆️ Created/updated a theme!")
      res.send(result);
    })
  })

  // Getting all themes:
  app.get('/read-themes', (req, res) => {
    console.log("\n 🗣 Called to read all themes!")

    Theme.find(function (err, result) {
      if (err) return console.error(err);
      console.log(" 💌 Sent out " + result.length + " results!")
      res.send(result);
    })
  });

  
  // Update a theme. Takes an object with query information
  app.post('/update-theme', (req, res) => {

    console.log("\n 🗣 Called to update an theme!")
    let _id = req.body._id;         // The id of the doc we're calling
    let update = req.body.update;   // The updated fields

    Theme.updateOne({_id: _id}, update, (result) => {
      console.log(" ⬆️ Updated a theme!")
      res.send(result);
    })

  });

  // Queries themes:
  app.get('/query-themes', (req, res) => {
    console.log("\n 🗣 Called to query themes!")

    Theme.find(req.query, function (err, result) {
      if (err) return console.error(err);
      console.log(" 💌 Sent  " + result.length + " themes to the frontend!")
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

}