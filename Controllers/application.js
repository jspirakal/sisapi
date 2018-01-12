const Application= require('../Models/application');
const User= require('../Models/Users');

module.exports={
    sendApplication:function(req,res){
        User.findOne({'rollno':req.body.rollno},function (err,data) {
            if(err){
                res.status(500).json(err);
            } else 
            {
                req.body.degree=data.degree;
                req.body.programe=data.programe;
                let app=new Application(req.body);                
                app.save((err,info)=>{
                    if(err){
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(info);
                    }
                });
        }
        });
    },
    getApplications:function(req,res){
        Application.find({'rollno':req.params.id},(err,data)=>{
            if(err){
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },
    getAllApplications:function(req,res){
        Application.find({},(err,data)=>{
            if(err){
                res.send(500,'error');
            } else {
                res.send(200,data);
            }
        });
    }
}