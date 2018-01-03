
let mongoose = require('mongoose');
let productschema = mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
}) 