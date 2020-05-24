const Block_Header = require('./Create_Header');
const crypto = require('crypto');

var Head = new Block_Header();

console.log(Head.Nonce);
console.log(Head.Time_Stamp);
//console.log(Head.Time_taken,'s');
Hash = crypto.createHash('SHA256').update(Head.Header_Buf).digest('hex');
console.log(Hash);

