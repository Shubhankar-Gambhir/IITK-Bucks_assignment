const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const crypto = require('crypto');
class input{
    constructor(Transaction_ID,Index,Signature_length,Signature){
        this.Transaction_ID = Transaction_ID;
        this.Index = Index;
        this.Signature_length = Signature_length;
        this.Signature = Signature;
    }

    get Buffer(){
        return this.CalcBuffer(); 
    }

    CalcBuffer(){
        var Tbuf = Buffer.alloc(32,this.Transaction_ID,'hex');
        var Ibuf = Buffer.alloc(4);
        Ibuf.writeUInt32BE(this.Index,0,4);
        var Lbuf = Buffer.alloc(4);
        Lbuf.writeUInt32BE(this.Signature_length,0,4);
        var Sbuf = Buffer.alloc(this.Signature_length,this.Signature,'hex');
        var arr = [Tbuf,Ibuf,Lbuf,Sbuf] ;

        var buf = Buffer.concat(arr);

        return buf;
    }
}
class output{
    constructor(Coins,Length,Public_key){
        this.Coins = Coins;
        this.Length = Length;
        this.Public_key = Public_key;
    }

    get Buffer(){
        return this.CalcBuffer(); 
    }

    CalcBuffer(){
        var Coins_1 = this.coins / (256 * 256) ;
        var Coins_2 = this.coins % (256 * 256) ;
        var Cbuf = Buffer.alloc(8);
        Cbuf.writeUIntBE(Coins_1,0,6);
        Cbuf.writeUInt16BE(Coins_2,5,2);
        var Lbuf = Buffer.alloc(4);
        Lbuf.writeUInt32BE(this.Length,0,32);
        var Pbuf = Buffer.alloc(this.Length,this.Public_key,"utf-8");
        var arr = [Cbuf,Lbuf,Pbuf] ;

        var buf = Buffer.concat(arr);

        return Buffer.concat(arr)
    }

}
var Num_Input = Number(prompt('No of Inuts: '));
var i = 0;
var Input_buf = Buffer.alloc(4);
Input_buf.writeUInt32BE(Num_Input,0,4);
var buf = Input_buf;

for (i = 0;i < Num_Input;i++){
    console.log('Input: ',i+1)
    var Transaction_ID = prompt('Transaction_ID: ');
    var Index = Number(prompt('Index: '));
    var Signature = prompt('Signature: ');
    var Signature_length = Buffer.byteLength(Signature,"hex")
    var new_Input = new input(Transaction_ID,Index,Signature_length,Signature);
    arr = [buf,new_Input.Buffer];
    buf= Buffer.concat(arr) ;
}
var Num_Output = parseInt(prompt('No of Outputs: '));
Output_buf = Buffer.alloc(4);
Output_buf.writeUInt32BE(Number(Num_Output),0,4);
arr = [buf,Output_buf];
buf= Buffer.concat(arr)
for (i = 0;i < Num_Output;i++){
    console.log('Output: ',i+1)
    var Coins = Number(prompt('Coins: '));
    var Public_key_path = prompt('Public_key file: ');
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
file = ID + '.dat';
fs.createWriteStream(file);
fs.writeFileSync(file,Uint8Array.from(buf))
