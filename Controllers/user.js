'use strict';
const    User=require('../Models/users');
const    Verification=require('../Models/verifications');
const    Reset=require('../Models/resets');
const    Hash=require('../libraries/crypto');
const    EMail = require('../hooks/email');
const    Validator = require('../libraries/validation');
// const { validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// const { sanitizeBody } = require('express-validator/filter');
const jwt = require('jsonwebtoken');


module.exports={

    login:function(req,res){    
            // Extract the validation errors from a request.
        //     const errors = validationResult(req);
        // console.log(errors.isEmpty);
        //     if (!errors.isEmpty()) {
        //         res.send(400,errors.array());
        //         // There are errors. Render the form again with sanitized values/error messages.
        //         // res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
        //     return;
        //     } 
            // else {
                // check('email')
                // // Every validator method in the validator lib is available as a
                // // method in the check() APIs.
                // // You can customize per validator messages with .withMessage()
                // .isEmail().withMessage('valid email');
                // const errors = validationResult(req);
                // console.log(errors.isEmpty);
                    // if (!errors.isEmpty()) {
                        // res.send(400,errors.array());
                        // There are errors. Render the form again with sanitized values/error messages.
                        // res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
                    // return;
                    // } 
                    // else {    
                        // return true;
                    // }
                    console.log(req.body.email);
        let p =req.body;
        req.body.password=Hash.hash(req.body.password);
        User.findOne(req.body, (err,data) => {
        //if    data.length =>1 then record found
        //if    data.length =0 then record not found found
            if(err)
            {
                res.sendStatus(500);
            }
            else if(data){
                p.status=1;
                User.findOne(p, (err,data) =>{
                    if(err)
                    {
                        res.sendStatus(500);
                    }
                    else
                    {
                        if(data)
                        {
                            if(data.tag=='super')
                            {
                                // let line=new Line({
                                    // 'userid':data[0]._id,
                                // });
                                // line.save(function(err,info){
                                    // if(err){
                                        // throw err;
                                    // }  else {
                                        res.cookie('username',data.username);                                    
                                        // res.cookie('imagepath',data[0].imagepath);                                    
                                        res.send("super");
                                    // }

                                // })
                            }
                            else if(data.tag=='sub')
                            {
                                // let line=new Line({
                                    // 'userid':data[0]._id,
                                // });
                                // line.save(function(err,info){
                                    // if(err){
                                        // throw err;
                                    // }  else {
                                        res.cookie('username',data.username);                                    
                                        // res.cookie('imagepath',data[0].imagepath);                                    
                                        res.send("sub");
                                    // }

                                // })
                            }
                            else {
                                // let line=new Line({
                                    // 'userid':data[0]._id,
                                // });
                                // line.save(function(err,info){
                                    // if(!err){
                                        res.cookie('username',data.username);                                    
                                        // res.cookie('imagepath',data[0].imagepath);      
                                        res.json("user");
                                    // }                    
                                // });
                            }

                        }
                        else {
                            res.send("notverify");
                        }
                    }
                });
            }
            else {
                res.send("incorrect");
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
        req.body.password=Hash.hash(req.body.password);
        let user=new User(req.body);
        user.save(function(err,data){
            if(err)
            {
                res.status(500)
                res.send("Email already exist");                
            }
            else
            {
                let verification=new Verification({
                    'userid':data._id,
                    'email':data.email,
                    'hash':Hash.hash(data.email)
                });
                verification.save(function(err,data){
                    if(err)
                    {
                        res.sendStatus(500);
                    }
                    else
                    {
                        EMail.sendJRMail('verify',data.email,Hash.hash(data.email));
                        res.sendStatus(200);
                    }
                });
            }

        });
    },

    getUser:function(req,res){
            User.findOne({_id:req.params.id},function(err,data){
                if(err)
                {
                    res.sendStatus(500);
                }
                else {
                    res.json(data);
                }
            });
    },

    updateUser:function(req,res){
        //Model.updata({conditions},{update value},callbackfunction(err,data))
        //Model.Update update first found result n="number of found",
        //nmodified="number modified" "ok" ="1" mean query executed
        sess=req.session;
        if(sess.userid){
            User.update({'_id':req.body._id},req.body,function(err,data){
                    if(err)
                    {
                        res.json({'err':err});
                    }
                    else
                    {
                        // data bject contain 'n' represent number of removed data and 'ok' if
                        // ok =1 than query executed
                        //if n=0 than given data not removed
                        res.json(data);
                    }
            });
        }
        else {
            res.json({'login':'do'});
        }
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
