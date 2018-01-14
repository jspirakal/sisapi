var mongoose=require('mongoose');
var ReplieSchema=mongoose.Schema({
   title:{
       type:String,
       required:true,
   },
   appid:{
     type:String,
        required:true,
   },
    body:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
        default:0,
    },
    date:{
       type: Date,
       default:Date.now
    }
});
module.exports=mongoose.model('replie',ReplieSchema);
