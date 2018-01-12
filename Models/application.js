var mongoose=require('mongoose');
var ApplicationSchema=mongoose.Schema({
   title:{
       type:String,
       required:true,
   },
   userid:{
    type:String,
    required:true,
    },
    smester:{
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
module.exports=mongoose.model('application',ApplicationSchema);
