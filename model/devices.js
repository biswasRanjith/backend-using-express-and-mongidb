const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Devices = new Schema({
    id: 
    {
     type:String,
    },
    imei: String,
    sim: String,
    tel: String,
    createdAt: Date,
    client: String

});

module.exports = mongoose.model('Devices', Devices);