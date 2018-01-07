const express = require('express');
const secret = require('../config/secrets');
const jwt = require('jsonwebtoken');
const User = require('../Controllers/user');
let router=express.Router();
router.get('/',(req,res) => {
    res.send('api working');
});
// User routing
router.post('/login',User.login);
router.post('/register',User.register);
router.post('/verifyhash',User.verifyHash);
router.post('/reset_password',User.reset_Password);
router.post('/verifyreset',User.verifyReset);
router.post('/resetpasswordrequest',User.resetPasswordRequest);
router.put('/changepassword',User.changePassword);
router.get('/logout',checkToken,User.logout);
router.get('/getuser/:id',User.getUser);
router.post('/login',checkToken,User.login);
router.post('/user',(req,res) => {
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
module.exports = router;