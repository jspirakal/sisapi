const { check,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports={
    checkLogin:function(req,res,next){
        console.log('checked');
        check('email')
        // Every validator method in the validator lib is available as a
        // method in the check() APIs.
        // You can customize per validator messages with .withMessage()
        .isEmail().withMessage('valid email');
        const errors = validationResult(req);
        console.log(errors.isEmpty);
            if (!errors.isEmpty()) {
                res.send(400,errors.array());
                // There are errors. Render the form again with sanitized values/error messages.
                // res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
            // return;
            } 
            else {    
                return next();
            }
        }
}