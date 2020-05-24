const prompt = require('prompt-sync')({sigint: true});
class input{
    Transaction_ID = prompt('    Transaction_ID: ');
    Index = Number(prompt('    Index: '));
    Signature = prompt('    Signature: ');
    Signature_length = Buffer.byteLength(this.Signature,"hex")
    

    get Buffer(){
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

module.exports = input;