const crypto = require('crypto')
const prompt = require('prompt-sync')({sigint: true});
const data = prompt('enter your data : ');
var target = '0000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
var x = 1;
var appended_data = data + String(x)
var hash = crypto.createHash('sha256').update(appended_data).digest('hex');
while(hash > target){
    x += 1;
    appended_data = data + String(x);
    hash = crypto.createHash('sha256').update(appended_data).digest('hex');
}
console.log('Required number :', x);
console.log('Appended String :', appended_data);
console.log('Hash:', hash);