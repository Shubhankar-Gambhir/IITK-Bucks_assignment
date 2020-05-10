const crypto = require('crypto');
const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const privateKey = fs.readFileSync('./Key_Pair/private.pem',encoding = 'utf8');
const data = prompt('enter your data : ');
const signature_file = prompt('enter signature_file path: ')
const sign = crypto.createSign('SHA256')
sign.update(Buffer.from(data))
signature = sign.sign({key:privateKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}).toString('base64')
console.log('Signature: ',signature);
fs.writeFile(signature_file, signature, function (err) {
    if (err) return console.log(err);
  });
