const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
class input{
    constructor(Buf){
        this.Buf = Buf;
    }

    get Transaction_ID(){
        return this.CalcTransaction_ID();
    }
    get Index(){
        return this.CalcIndex();
    }
    get New_buf(){
        return this.Calc_N_Buf();
    }
    get Signature_length(){
        return this.CalcLen();
    }
    get Signature(){
        return this.CalcSign();
    }
    CalcTransaction_ID(){
        var Tbuf = this.Buf.slice(0,32);
        var ID = Tbuf.toString('hex');
        return ID;
    }
    CalcIndex(){
        var Ibuf = this.Buf.slice(32,36);
        var Ix = Ibuf.readUInt32BE(0);
        return Ix ;
    }
    CalcLen(){
        var Lbuf =  this.Buf.slice(36,40);
        var Len = Lbuf.readUInt32BE(0);
        return Len;
    }
    CalcSign(){
        var Sbuf = this.Buf.slice(40,40 +this.Signature_length)
        var Sign = Sbuf.toString('hex');
        return Sign;
    }
    Calc_N_Buf(){
        var Nbuf = this.Buf.slice(40 + this.CalcLen());
        return Nbuf;
    }
}
class output{
    constructor(Buf){
        this.Buf = Buf;
    }

    get Coin(){
        return this.CalcCoins();
    }
    get Length(){
        return this.CalcLen();
    }
    get Key(){
        return this.CalcPKey();
    }
    get New_buf(){
        return this.Calc_N_Buf();
    }

    CalcCoins(){
        var Cbuf =  this.Buf.slice(0,8);
        var Coins = Cbuf.readBigUInt64BE(0);
        return Coins ;
    }

    CalcLen(){
        var Lbuf =  this.Buf.slice(8,12);
        var Len = Lbuf.readUInt32BE(0);
        return Len;
    }
    
    CalcPKey(){
        var Pbuf = this.Buf.slice(12, 12 + this.Length);
        var P_Key = Pbuf.toString('utf8');

        return P_Key;
    }

    Calc_N_Buf(){
        var Nbuf = this.Buf.slice(12 + (this.CalcLen / 2),-1);

        return Nbuf;
    }
    
}
var file = prompt('Enter File path: ');
var Byte = fs.readFileSync(file);
var IDbuf = Byte.slice(0,32);
var ID = IDbuf.toString('hex');
console.log('Transaction_ID: ',ID)
Byte = Byte.slice(32,Byte.byteLength);
N_Input = Byte.slice(0,4);
N_Input = N_Input.readUInt32BE(0);
console.log('No of Input: ',N_Input);
Byte = Byte.slice(4,Byte.byteLength);
var i ;
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
Byte = Byte.slice(4);
console.log('No of Output: ',N_Output);
for(i = 0; i < N_Output;i++){
    var New_Output = new output(Byte);
    console.log('   Output ',i+1,': ');
    console.log(Byte);
    console.log('       Number of Coins:',Number(New_Output.Coin));
    console.log('       Length of the public Key: ',New_Output.Length)
    console.log('       Public key: ',New_Output.Key);
    Byte = New_Output.New_buf ;
}

