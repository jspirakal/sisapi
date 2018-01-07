var mongoose=require('mongoose');
var verifyschema=mongoose.Schema({
    userid:{
       type:String,
       required:true
   },
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
module.exports=mongoose.model('verification',verifyschema);
