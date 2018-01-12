const Application= require('../Models/application')

module.exports={
    sendApplication:function(req,res){
        let app=new Application(req.body);
        app.save((err,info)=>{
            if(err){
                res.send(500,'error');
            } else {
                res.send(200,info);
            }
        });
    },
    getApplications:function(req,res){
        Application.find({'userid':req.params.id},(err,data)=>{
            if(err){
                res.send(500,'error');
            } else {
                res.send(200,data);
            }
        });
    },
    getAllApplications:function(req,res){
        Application.find({'userid':req.params.id},(err,data)=>{
            if(err){
                res.send(500,'error');
            } else {
                res.send(200,data);
            }
        });
    }
}