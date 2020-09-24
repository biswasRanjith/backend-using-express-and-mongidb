// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net';

// // Database Name
// const dbName = '__CONCOX__';

// // Create a new MongoClient
// const client = new MongoClient(url, {useUnifiedTopology: true});

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });


const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net/__CONCOX__?retryWrites=true'

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(
  console.log("database Connected")
)
.catch(err => console.log(err.reason)); 




  
module.exports = mongoose;