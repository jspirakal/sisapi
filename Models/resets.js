var mongoose=require('mongoose');
var ResetSchema=mongoose.Schema({
   email:{
       type:String,
       required:true
   },
    hash:{
       type:String,
       required:true
   },
   date:{
       type: Date,
       default:Date.now
       }
});
module.exports=mongoose.model('reset',ResetSchema);
