var mongoose=require('mongoose');
var TimeTableSchema=mongoose.Schema({
   department:{
       type:String,
       required:true,
   },
    smester:{
        type:String,
        required:true,
    },
    path:{
        type:String,
        required:true,
    },
    date:{
       type: Date,
       default:Date.now
    }
});
module.exports=mongoose.model('timetable',TimeTableSchema);
