
/*

        > Vocab API endpoint <

  You know how the DB stores collections 
  with specific schemas?

  Vocab is like *dynamic* schemas,
  organizing all four of the categories, 
  including itself. 

*/

/* This is a chunk of code that defines our Vocab collection & its routes. */
module.exports = function(app, mongoose){

  /* 
    ============   Vocab schema   ==============
          This defines the structure we use
                to store our vocab.
  */
  let vocab_schema = new mongoose.Schema({

    /* Prototype id: */
    id: {
      type: String, 
      lowercase: true, 
      unique: true, // Only available bc of our plugin
      required: [true, "can't be blank"], 
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
      index: true
    },

    /* Prototype name: */
    name: String,

    /* What collection is this in? */
    type: String, // 'vocab', 'object', 'display', 'system', 'action',

    /* What's the most specific category this is in? */
    _prototype: String 

  }, {timestamps: true});

  let Vocab = mongoose.model('vocab', vocab_schema, 'vocab');
  



  /* 
    =============    API routes    ==================
          This is like a store file's getters.
            It's how we hear from the store!
  */

  app.get('/read-user', (req, res) => {
    res.send('felix');
  });

  // Getting a user based on their password token (stored locally to keep people logged in)
  app.get('/read-vocab', (req, res) => {
    if (!req.query) {
      console.warn("req.query not found! Make sure you set params!")
    }

    // Finding & logging query id:
    let _id = req.query.id;
    console.log(" ⍿ /api/read-vocab - Reading a document with id:")
    console.log('\x1b[36m%s\x1b[0m', "'" + _id + "'");
    
    Vocab.find({ id: _id }, (err, result) => {
        console.log("Results:");
        console.log(result);
      let found_vocab = result[0];

      // Handling if no word was found:
      if (!found_vocab) {
        console.log("No vocab found :/ ")
        res.send(result);
        return [];
      } else {
        console.log("Found vocab: " + found_vocab);
        res.send(found_vocab);
      }
    });

  });

  // Getting a user based on their password token (stored locally to keep people logged in)
  app.get('/read-vocab', (req, res) => {
    if (!req.query) {
      console.warn("req.query not found! Make sure you set params!")
    }

    // Finding & logging query id:
    let _id = req.query.id;
    console.log(" ⍿ /api/read-vocab - Reading a document with id:")
    console.log('\x1b[36m%s\x1b[0m', "'" + _id + "'");
    
    Vocab.find({ id: _id }, (err, result) => {
        console.log("Results:");
        console.log(result);
      let found_vocab = result[0];

      // Handling if no word was found:
      if (!found_vocab) {
        console.log("No vocab found :/ ")
        res.send(result);
        return [];
      } else {
        console.log("Found vocab: " + found_user.id);
        res.send({
          user: found_user 
        });
      }
    });

  });

  


  /* 
    =============    Commands    =================
          This is like a store file's actions.
          It's how we set things in the store. 
  */
  app.post('/run-command', (req, res) => {
    res.send('felix');
  });

}