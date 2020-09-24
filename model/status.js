const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Status = new Schema({
    input: String,
    tag: String,
    case: String,
    time: Date,
    noSatellites: Number,
    gps: [{
        0: Number,
        1: Number
    }],
    speed : Number,
    course: String,
    cellTower:[{
        0:Number,
        1:Number,
        2:Number,
        3:Number
    }],
    info_serial_no:Number,
    output:{
        type: String,
        default: null
    },
    imei:String,
    socket: String,
    device: String,
    client: String,
    battery: Number,
    createdAt: Date
});

Status.plugin(mongoosePaginate);
module.exports = mongoose.model('Status', Status);