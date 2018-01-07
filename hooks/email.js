const    Email=require('../libraries/email');

module.exports={
    sendJRMail:function(method,email,hash){
        if(method=='verify')
        {
            let title="Verify-Your-Account";
            let message=`Please verify your account by click the link!  <a href="http://159.203.114.156:8080/verify-hash/${hash}">verify-account</a>`;
            Email.mailOptions.to=email;
            Email.mailOptions.subject= `${title} ✔`;
            Email.mailOptions.html= `<div style="font-family:ubuntu; background-color: #f5f5f5; padding: 30px; border: 1px solid #ccc;
            border-radius: 3px;">
            <div style=" font-size: 18px; font-weight:bolder; color: #319e94;text-align: center;">
            Welcome To WordZille       
            </div>
            <div style=" font-size: 16px;color: #319e94;text-align: left;">
            ${title}       
            </div>
                <div style="text-align:left; color:#444;">
                ${message}
                </div>
                <div style=" font-size: 13px;color: #319e94;text-align:left ;margin-top: 30px;">
                    Thanks from joing the WordZille!
                </div>
            </div>`;
            Email.transporter.sendMail(Email.mailOptions, (error, info) => {
                if (error) {
                    return  error;
                }
                return true;
            });
        }
        else if(method=='resetpassword'){

            let title="Reset-Your-Account";
            let message=`Resetyourpassword by click the link!  <a href="http://159.203.114.156:8080/reset-password/${hash}">reset-password</a>`;
            Email.mailOptions.to=email;
            Email.mailOptions.subject= `${title} ✔`;
            Email.mailOptions.html= `<div style="background-color: #f5f5f5; padding: 30px; border: 1px solid #ccc;
            border-radius: 3px;">
            <div style=" font-size: 16px;color: #319e94;text-align: left;">
            ${title}       
            </div>
                <div style="text-align:left">
                ${message}
                </div>
                <div style=" font-size: 16px;color: #319e94;text-align: center;margin-top: 30px;">
                    Thanks from Team!
                </div>
            </div>`;
                Email.transporter.sendMail(Email.mailOptions, (error, info) => {
                if (error) {
                    console.log('reset error');

                return   error;
                }
                console.log('reset sent');
                return true;
            });
        }
    }
}