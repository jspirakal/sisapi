var mongoose=require('mongoose');
var userschema=mongoose.Schema({
    username:{
       type:String,
       required:true
   },
   email:{
       type:String,
       unique:true,
       required:true
   },
   password:{
       type:String,
       required:true
   },
   contact:{
       type:String,
       required:true
   },
   address:{
    type:String,
    required:true
    },
   tag:{
       type:String,
       default:'user'
   },
   status:{
       type:Number,
       default:0
   },
   createdAt:{
       type: Date,
       default:new Date()
       }
});
var users=module.exports=mongoose.model('user',userschema);
