
'use strict';
var credentials = require('../config/secrets.js');

const nodemailer = require('nodemailer');
module.exports={

    transporter : nodemailer.createTransport({
        host: 'smtp.googlemail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user:credentials.gmail.user,
            pass:credentials.gmail.password
        }
    }),

    // setup email data with unicode symbols
    mailOptions : {
        from: '"WordZille" <sender.02.mail@gmail.com>', // sender address
        to: '13054119-158@uog.edu.pk', // list of receivers
        subject: ' ', // Subject line
        // text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    },
    done : function(data){
        console.log(data);
    }
    // send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    //     // Preview only available when sending through an Ethereal account
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //
    //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // });
// });
}
// module.exports=transporter;
