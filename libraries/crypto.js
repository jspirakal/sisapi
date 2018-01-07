'use strict';
const crypto = require('crypto');
module.exports={
    hash:function(value){
        const cipher = crypto.createCipher('aes192', 'aesmaase');
        let encrypted = cipher.update(value,'utf8','hex');
         encrypted += cipher.final('hex');
        return encrypted;
    }
}
