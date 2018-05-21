'use strict';
const    User=require('../Models/Users');
const    Verification=require('../Models/verifications');
const    Reset=require('../Models/resets');
const    Hash=require('../libraries/crypto');
const    EMail = require('../hooks/email');
const    Validator = require('../libraries/validation');
const    Secret = require('../config/secrets');
const   Admin = require('../Models/admin');
// const { validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// const { sanitizeBody } = require('express-validator/filter');
const jwt = require('jsonwebtoken');

module.exports={

    login:function(req,res){    
        let p =req.body;
        console.log(p);
        // req.body.password=Hash.hash(req.body.password);
        User.findOne(req.body, (err,data) => {
            if(err)
            {
                res.status(500).json("try agin");
            }
            else if(data){
                res.json({"user":"student","rollno":data.rollno,'token':jwt.sign({p},Secret.jwtSecret)});
            }
            else {
                 
                Admin.findOne(req.body, (err,data) => {
                    if(err)
                    {
                        res.status(500).json("try agin");
                    }
                    else if(data){
                        if(data.type=='admin')
                        {
                            res.json({"user":"admin","rollno":data.rollno,'token':jwt.sign({p},Secret.jwtSecret)});
                        }
                        else if(data.type=='controller') {
                            res.json({"user":"controller","rollno":data.rollno,'token':jwt.sign({p},Secret.jwtSecret)});
                        } else {
                            res.json({"user":"hod","rollno":data.rollno,'token':jwt.sign({p},Secret.jwtSecret)});
                            
                        }
                            
                    }
                    else {
                         
                        res.status(500).json('incorrect username or password!');
                    }
                });
            }
        });
        // }
    // }
    },
    verifyHash:function(req,res){
        Verification.findOne(req.body, (err,data) => {
            if(err)
            {
                res.sendStatus(500);
            }
            else if(data) {
                // p.status=1;
                User.findOne({email:data.email}, (err,data) =>{
                    if(err)
                    {
                        res.sendStatus(500);
                    }
                    else
                    {
                        if(data)
                        {
                            User.update({'email':data.email},{'status':1},(err,data)=> {
                                if (err) {
                                    res.sendStatus(500);
                                }
                                else {
                                    Verification.remove({'hash':req.body.hash},(err,data)=>{
                                        if(err){
                                            res.sendStatus(500);

                                        }
                                        else {
                                            res.json({"success":"Account Activated Suucesfully. Enjoy our services. Thanks for joining!"});
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            res.json({"invalid":"invalid Hash"});
                        }
                    }
                });
            }
            else
            {
                res.json({"invalid":"invalid Hash"});
            }
        });
    },
    logout:function(req,res){
        let a=req.session.userid;
        req.session.destroy(function(err) {
          if(err) {
            res.json({"err":err});
          } else {
                Line.remove({'userid':a},function(err,info){
                if(err){
                    throw err;
                }
              })
            res.json({'success':'logout'});
          }
        });
    },
    register:function(req,res){
        // req.body.password=Hash.hash(req.body.password);
        let user=new User(req.body);
        user.save(function(err,data){
            if(err)
            {
                res.status(500).send('Student Already Registered with that Roll No!');
            }
            else
            {
                res.status(200).send('ok');
            }

        });
    },
    updateUser:function(req,res){
        User.update({_id:req.params.id},req.body,function(err,data){
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.status(200).send('ok');
            }

        });
    },
    getUser:function(req,res){
        console.log(req.headers);
        
            User.findOne({"rollno":req.params.id},function(err,data){
                if(err)
                {
                    res.status(500).json(data);
                }
                else {
                    res.status(200).json(data);
                }
            });
    },
    getAllUser:function(req,res){
        User.find({ tag: { $ne: 'admin' } },function(err,data){
            if(err)
            {
                res.status(500).json(data);
            }
            else {
                res.status(200).json(data);
            }
        });
    },
    reset_Password:function(req,res){
        Reset.findOne({email:req.body.email}, (err,data) => {
            if(err)
            {
                res.sendStatus(500);
            }
            else if(data){
                // p.status=1;
                User.update({'email':data.email},{'password':Hash.hash(req.body.newpassword)}, (err,data) =>{
                    if(err)
                    {
                        res.sendStatus(500);
                    }
                    else
                    {
                        Reset.remove({'email':req.body.email},(err,data)=> {
                            if (err) {
                                res.sendStatus(500);
                            }
                            else {
                                res.json({"success":"Your Password  Reset Succesfully.Now Login With That! <strong>you will redirect to Login Panel in 3 seconds!</strong>"});
                            }
                        });
                    }
                });
            }
            else
            {
                res.json({"invalid":"invalid Hash"});
            }
        });
    },
    changePassword:function(req,res){
            req.body.confirm=Hash.hash(req.body.confirm);
            req.body.old=Hash.hash(req.body.old);
            console.log(req.body);
            User.update({'_id':req.params.id,'password':req.body.old},{'password':req.body.confirm},function(err,data){
                if(err)
                {
                    res.send(500,{error:'Opps! Password not changed.'});
                }
                else
                {
                    res.sendStatus(200);
                }
            });
    },
    resetPasswordRequest:function(req,res){
        // res.send(req.body);
        User.findOne(req.body,(err,data) => {
            if(err) {
                res.sendStatus(500);
            }
            else if(data)
                {
                Reset.findOne(req.body, (err,data) => {
                    if(err)
                    {
                        res.sendStatus(500);
                    }
                    else if(data){
                                EMail.sendJRMail('resetpassword',req.body.email,Hash.hash(req.body.email));
                                res.json({"success":"Password reset link sent to your Email, Reset password from there! If not get link from inbox or spam than try again it!"});
                    }
                    else {             
                        let reset=new Reset({
                            'email':req.body.email,
                            'hash':Hash.hash(req.body.email)
                        });
                        reset.save(function(err,data){
                            if(err)
                            {
                                res.sendStatus(500);
                            }
                            else
                            {
                                EMail.sendJRMail('resetpassword',req.body.email,Hash.hash(req.body.email));
                                res.json({"success":"Password reset link sent to your Email, Reset password from there! If not get link from inbox or spam than try again it!"});
                            }
                        });
                    }
                });
            }
            else{
                res.send(404,{error:'Please use registered email.'});
            }

        });
        
    },
    verifyReset:function(req,res){
        Reset.findOne(req.body, (err,data) => {
            if(err)
            {
                res.sendStatus(500);
            }
            else if(data){
                User.findOne({email:data.email}, (err,data) =>{
                    if(err)
                    {
                        res.json(500);
                    }
                    else
                    {
                        if(data)
                        {
                            res.json({"email":data.email});
                        }
                        else {
                            res.send(404,{error:"invalid Hash"});
                        }
                    }
                });
            }
            else
            {
                res.send(404,{error:"invalid Hash"});
            }
        });
    }
}
