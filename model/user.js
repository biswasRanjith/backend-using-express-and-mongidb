const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  
    id: 
    {
     type:Number,
     unique: true
    },
    name: String,
    email:
    {
        type:String,
        unique:true
    },
    password: String,
    accessToken: String,
    refreshToken: String,
    expiresin: Number,
    time: Date
});

// const User = mongoose.model('User', User);

module.exports = mongoose.model('User', User);

