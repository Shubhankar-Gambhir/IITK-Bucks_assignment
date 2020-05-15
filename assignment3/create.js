const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const crypto = require('crypto');

const input = require('./Create_Transaction_Classes/Create_Input');
const output = require('./Create_Transaction_Classes/Create_Output');

var i = 0;

var Num_Input = Number(prompt('No of Inputs: '));
var Input_buf = Buffer.alloc(4);
Input_buf.writeUInt32BE(Num_Input,0,4);
var buf = Input_buf;

for (i = 0;i < Num_Input;i++){
    console.log('Input: ',i+1)
    var Transaction_ID = prompt('    Transaction_ID: ');
    var Index = Number(prompt('    Index: '));
    var Signature = prompt('    Signature: ');
    var Signature_length = Buffer.byteLength(Signature,"hex")
    var new_Input = new input(Transaction_ID,Index,Signature_length,Signature);
    arr = [buf,new_Input.Buffer];
    buf= Buffer.concat(arr) ;
}

var Num_Output = Number(prompt('No of Outputs: '));
Output_buf = Buffer.alloc(4);
Output_buf.writeUInt32BE(Number(Num_Output),0,4);
arr = [buf,Output_buf];
buf= Buffer.concat(arr)

for (i = 0;i < Num_Output;i++){
    console.log('Output: ',i+1)
    var Coins = Number(prompt('    Coins: '));
    var Public_key_path = prompt('    Public_key file: ');
    var Public_key = fs.readFileSync(Public_key_path, encoding = "utf-8")
    var Length = Buffer.byteLength(Public_key,"utf-8")
    var new_Output = new output(Coins,Length,Public_key);
    arr = [buf,new_Output.Buffer];
    buf = Buffer.concat(arr) ;
}

var ID = crypto.createHash('sha256').update(Uint8Array.from(buf)).digest('hex');
var Transaction_ID = Buffer.alloc(32,ID,'hex')
arr = [Transaction_ID, buf];
buf = Buffer.concat(arr) ;

file = '../Transactions/' + ID + '.dat';
fs.createWriteStream(file);
fs.writeFileSync(file,buf);
