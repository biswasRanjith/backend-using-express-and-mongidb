const mongoose = require('mongoose');


const mongoURI = process.env.DB_STRING

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