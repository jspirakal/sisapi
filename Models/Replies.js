var mongoose=require('mongoose');
var ReplieSchema=mongoose.Schema({
   
    appid:{
    type:String,
        required:true,
    },
  
    admin:{
        type:String,
        default:null,
    },
    controller:{
        type:String,
        default:null,
    },
    hod:{
        type:String,
        default:null,
    },
    date:{
       type: Date,
       default:Date.now
    }
});
module.exports=mongoose.model('replie',ReplieSchema);
