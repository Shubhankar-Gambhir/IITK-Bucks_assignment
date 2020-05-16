const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const crypto = require('crypto');

const input = require('./Read_Transaction_Classes/Read_Input');
const output = require('./Read_Transaction_Classes/Read_Output');

var i ;

var file = prompt('Enter File path: ');
var Byte = fs.readFileSync(file);

var ID = crypto.createHash('SHA256').update(Byte).digest('hex');
console.log('Transaction_ID: ',ID)

N_Input = Byte.slice(0,4);
N_Input = N_Input.readUInt32BE(0);
console.log('No of Input: ',N_Input);
Byte = Byte.slice(4,Byte.byteLength);

for(i = 0; i < N_Input;i++){
    var New_Input = new input(Byte);
    console.log('   Input ',i+1,': ');
    console.log('       Transaction ID: ',New_Input.Transaction_ID);
    console.log('       Index: ',New_Input.Index);
    console.log('       Length of the signature: ',New_Input.Signature_length);
    console.log('       Signature: ',New_Input.Signature);
    Byte = New_Input.New_buf ;
}

var N_Output = Byte.slice(0,4);
N_Output = N_Output.readUInt32BE(0);
console.log('No of Output: ',N_Output);
Byte = Byte.slice(4);

for(i = 0; i < N_Output;i++){
    var New_Output = new output(Byte);
    console.log('   Output ',i+1,': ');
    console.log('       Number of Coins:',Number(New_Output.Coin));
    console.log('       Length of the public Key: ',New_Output.Length)
    console.log('       Public key: ',New_Output.Key);
    Byte = New_Output.New_buf ;
}

