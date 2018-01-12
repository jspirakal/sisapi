var mongoose=require('mongoose');
var ApplicationSchema=mongoose.Schema({
   title:{
       type:String,
       required:true,
   },
    smester:{
        type:String,
        required:true,
        },
        degree:{
            type:String,
            required:true
           },
           programe:{
            type:String,
            required:true
           },
           rollno:{
            type:String,
            required:true
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
