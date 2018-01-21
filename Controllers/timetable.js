const TimeTable = require('../Models/Timetable');
const multer = require('multer');
const path  =   require('path');
const storage=multer.diskStorage({
    destination:'public/uploads',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+""+path.extname(file.originalname));
    }
});
const upload = multer({
    storage:storage,
    limits:{fileSize:5000000}
    // fileFilter:(req,file,cb)=>{
    //     checkFileType(file,cb);
    // }
    }).single('timetable');
    // function checkFileType(file,cb) {
    //     const filetypes=/zip|rar|x-rar/;
    //     const filetype=filetypes.test(path.extname(file.originalname).toLowerCase());
    //     const mimetype=filetypes.test(file.mimetype);
    //     if (mimetype && filetype) {
    //         return cb(null,true);
    //     }
    //     else {
    //             cb('Only compressed file is allowed!')
    //     }
    //     // const type=filetypes.text(path.extname(file.originalname));
    // }
module.exports={
    sendTimeTable:function(req,res){
        upload(req,res,(err)=>{
            if(err)
            {
                res.json({'err':err});
            }
            else {
                let pac={
                    'department':req.body.department,
                    'smester':req.body.smester,
                    'path':req.file.path
                };
                let app=new TimeTable(pac);                
                app.save((err,info)=>{
                    if(err){
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        })
    },
    getTimeTable:function(req,res){
        News.find({},(err,data)=>{
            if(err){
                res.sendStatus(500);
            } else {
                res.status(200).json(data);
            }
        });
    }
}