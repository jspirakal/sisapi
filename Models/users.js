var mongoose=require('mongoose');
var userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fathername:{
       type:String,
       required:true
    },
    registrationno:{
        type:String,
        required:true
    },
    rollno:{
       type:String,
       unique:true,
       required:true
   },
   gender:{
       type:String,
       required:true,
   },
//    email:{
//        type:String,
//        required:true,
//    },
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
       default:'student'
   },
   degree:{
    type:String,
    required:true
   },
   programe:{
    type:String,
    required:true
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
