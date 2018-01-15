const News= require('../Models/News');
module.exports={
    sendNews:function(req,res){
        console.log(req.body);
        let app=new News(req.body);                
        app.save((err,info)=>{
            if(err){
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    },
    getNews:function(req,res){
        News.find({},(err,data)=>{
            if(err){
                res.sendStatus(500);
            } else {
                res.status(200).json(data);
            }
        });
    }
    // getAllApplications:function(req,res){
    //     Application.find({},(err,data)=>{
    //        if(err){
    //             res.status(500).json('error');
    //         } else {
    //             res.status(200).json(data);
    //         }
    //     });
    // },
    // replyApplication:function(req,res){
    //     let app=new Replies(req.body);
    //     app.save(function(err,info){
    //         if(err){
    //             res.sendStatus(500);
    //         } else {
    //             console.log(req.body);
    //             Application.update({'_id':req.body.appid},{'status':1},function(err,info){
    //                 if(err){
    //                 res.sendStatus(500);
    //                 } else {
    //                     res.sendStatus(200);
    //                 }
    //             })
    //         }
    //     });
    // },
    // getReply:function(req,res){
    //     Replies.findOne({'appid':req.params.id},(err,data)=>{
    //         if(err){
    //             res.status(500).json('error');
    //         } else {
    //             res.status(200).json(data);
    //         }
    //     });
    // },
}