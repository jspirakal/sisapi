var mongoose=require('mongoose');
var ResetSchema=mongoose.Schema({
   title:{
       type:String,
       required:true,
   },
   userid:{
    type:String,
    required:true,
    },
    body:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
        required:0,
    },
    date:{
       type: Date,
       default:Date.now
    }
});
module.exports=mongoose.model('reset',ResetSchema);
