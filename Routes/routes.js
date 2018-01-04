const express = require('express');
const secret = require('../config/secrets');
const jwt = require('jsonwebtoken');
let Route=express.Router();
Route.get('/',(req,res) => {
    res.send('api working');
});
Route.get('/authenticate',checkToken,(req,res) => {
    res.json('authenticate');
});
Route.post('/user',(req,res) => {
    let user=req.body;
    let token = jwt.sign({user},secret.jwtSecret);
    res.json(token);
});
function checkToken(req,res,next) {
    const bearerHeader= req.headers['authorization'];
    if(bearerHeader===undefined) {
        res.sendStatus(403);
    } else {
        let bearer = bearerHeader.split(" ");
        let token = bearer[1];
        jwt.verify(token,secret.jwtSecret,(err,data)=>{
            if(err){
                res.sendStatus(403);
            } else {
                return next();
            }
        });
    }
}
module.exports = Route;