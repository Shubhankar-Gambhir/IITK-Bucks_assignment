

const crypto = require('crypto');
const fs = require('fs');
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
}); 
fs.writeFile('private.pem', privateKey,function (err) {
  if (err) return console.log(err);
  console.log(privateKey);
});
fs.writeFile('public.pem', publicKey, function (err) {
  if (err) return console.log(err);
  console.log(publicKey);
});
