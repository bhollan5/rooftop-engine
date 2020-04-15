
let ObjectID = require('mongodb').ObjectID;        // This tool lets us convert object id's to be queryable

module.exports = function(app, mongoose){

  //
  // Access our articles in the database:
  //

  // Defining our mongoose schema for a given article:
  let articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    body_data: Array,
    owner: String,
    _id: String,
  }, {timestamps: true});

  let Article = mongoose.model('Article', articleSchema);


  // Creating a new article:
  app.post('/create-article', (req, res) => {
    let newArticle = new Article(req.body);
    newArticle.save(function (err, result) {
      if (err) return console.error(err);
      console.log(' 💾 Saved a new article to the database!');
      res.send(result)
    });
  })

  // Read a collection by query:
  app.get('/read-articles', (req, res) => {
    console.log("\n 🗣 Called to query articles!")
    console.log(":)")
    console.log(req.query)

    Article.find(req.query, function (err, result) {
      if (err) return console.error(err);
      console.log(" 💌 Sent  " + result.length + " articles to the frontend!")
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
      _id: _id
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