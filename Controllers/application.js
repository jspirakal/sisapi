const Application= require('../Models/application');
const User= require('../Models/Users');
const Replies= require('../Models/Replies');

module.exports={
    sendApplication:function(req,res){
        User.findOne({'rollno':req.body.rollno},function (err,data) {
            if(err){
                res.status(500).json(err);
            } else 
            {
                req.body.degree=data.degree;
                req.body.name=data.name;                
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
                res.status(500).json('error');
            } else {
                res.status(200).json(data);
            }
        });
    },
    getAllApplications:function(req,res){
        Application.find({},(err,data)=>{
           if(err){
                res.status(500).json('error');
            } else {
                res.status(200).json(data);
            }
        });
    },
    getApplicationByRollNo:function(req,res){
        if(req.params.user==='admin'){
            Application.find({rollno:req.params.rn},(err,data)=>{
            if(err){
                    res.status(500).json('error');
                } else {
                    res.status(200).json(data);
                }
            });
        } else if(req.params.user==='controller'){
            Application.find({rollno:req.params.rn,admin:true},(err,data)=>{
                if(err){
                        res.status(500).json('error');
                    } else {
                        res.status(200).json(data);
                    }
                });
        } else {
            Application.find({rollno:req.params.rn,controller:true},(err,data)=>{
                if(err){
                        res.status(500).json('error');
                    } else {
                        res.status(200).json(data);
                    }
                });
        }
    
    },
    getAllApplicationsByController:function(req,res){
        Application.find({admin:true},(err,data)=>{
           if(err){
                res.status(500).json('error');
            } else {
                console.log(data);
                res.status(200).json(data);
            }
        });
    },
    getAllApplicationsByHod:function(req,res){
        Application.find({controller:true},(err,data)=>{
           if(err){
                res.status(500).json('error');
            } else {
                res.status(200).json(data);
            }
        });
    },
    replyApplicationByAdmin:function(req,res){
        let app=new Replies({admin:req.body.body,appid:req.params.appid});
        app.save(function(err,info){
            if(err){
                res.sendStatus(500);
            } else {
                console.log(req.body);
                Application.update({'_id':req.params.appid},{'admin':true},function(err,info){
                    if(err){
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                })
            }
        });
    },
    replyApplicationByController:function(req,res){
        Application.findByIdAndUpdate(req.params.appid,{controller:true})
        .then(ret=>{
            Replies.findOneAndUpdate({appid:req.params.appid},{controller:req.body.body})
            .then(ret=>{
                res.status(200).json('ok');
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);            
            })
        })
        .catch(err=>{
            console.log(err);
            console.log('scond');            
            res.status(500).json(err);            
        }) 
    },
    replyApplicationByHod:function(req,res){
        Application.findByIdAndUpdate(req.params.appid,{hod:true})
        .then(ret=>{
            Replies.findOneAndUpdate({appid:req.params.appid},{hod:req.body.body})
            .then(ret=>{
                res.status(200).json('ok');
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);            
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);            
        }) 
    },
    getReply:function(req,res){
        Replies.findOne({'appid':req.params.id},(err,data)=>{
            if(err){
                res.status(500).json('error');
            } else {
                res.status(200).json(data);
            }
        });
    },
}