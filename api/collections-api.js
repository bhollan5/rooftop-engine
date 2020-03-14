module.exports = function(app, mongoose){

  //
  // Access our collections in the database:
  //

  // Defining our mongoose schema for a given collection:
  let collectionSchema = new mongoose.Schema({
    collectionTitle: String,
    collectionDescription: String,
    collectionData: Array,
  });

  let Collection = mongoose.model('Collection', collectionSchema);


  // Creating a new collection:
  app.post('/create-collection', (req, res) => {
    let newCollection = new Collection(req.body);
    newCollection.save(function (err, result) {
      if (err) return console.error(err);
      console.log(' 💾 Saved a new collection to the database!');
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

  // File Upload - deprecated
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

}