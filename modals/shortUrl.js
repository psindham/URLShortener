const mongoose = require('mongoose');
const shortid = require('shortid');

const shortURLSchema= new mongoose.Schema({
    TEXT:{
        type:String,
        required: true
    },
    ID:{
        type:String,
        required:true,
        default:shortid.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
})
module.exports= mongoose.model('ShortUrl',shortURLSchema);