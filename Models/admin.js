var mongoose=require('mongoose');
var adminschema=mongoose.Schema({
    name:{
        type:String,
        default:'Admin'
    },
    rollno:{
       type:String,
       unique:true,
       required:true
    },
    password:{
       type:String,
       required:true
    },
   type:{
       type:String,
       default:'student'
   },
   createdAt:{
       type: Date,
       default:new Date()
    }
});
module.exports=mongoose.model('admin',adminschema);
