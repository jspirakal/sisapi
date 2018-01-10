const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports={
    checkLogin:function(req,res,next){
        //checking
        req.check('email')
        .isEmail().withMessage('valid email')
        //senitizating
        const data =req.getValidationResult();
        data
        .then(function(errors){
            if(errors.isEmpty()){
                return next();
            } else {    
                res.send(400,errors.array());
            }
        });
    }
}