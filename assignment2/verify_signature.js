const crypto = require('crypto');
const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const publicKey = fs.readFileSync('./Key_Pair/public.pem',encoding = 'utf8');
const data = prompt('enter data : '); //shubh or false
const signature_file = './' +  prompt('enter signature_file : '); //shubh.txt or false.txt
const signature = fs.readFileSync(signature_file,encoding = 'utf8');
const verify = crypto.createVerify('SHA256');
verify.update(Buffer.from(data, 'utf8'));
verifyRes = verify.verify({key: publicKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}, Buffer.from(signature, 'base64'))
if(verifyRes){
    console.log('Signature verified!');//shubh.txt
}
else{
    console.log('Verification failed');//false.txt(correct input for false.txt is 'true'.)
}
