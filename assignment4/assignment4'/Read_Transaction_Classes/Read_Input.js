class input{
    constructor(Buf){
        this.Buf = Buf;
    }

    get Transaction_ID(){
        var Tbuf = this.Buf.slice(0,32);
        var ID = Tbuf.toString('hex');
        return ID;
    }
    get Index(){
        var Ibuf = this.Buf.slice(32,36);
        var Ix = Ibuf.readUInt32BE(0);
        return Ix ;
    }
    get New_buf(){
        var Nbuf = this.Buf.slice(40 + this.Signature_length);
        return Nbuf;
    }
    get Signature_length(){
        var Lbuf =  this.Buf.slice(36,40);
        var Len = Lbuf.readUInt32BE(0);
        return Len;
    }
    get Signature(){
        var Sbuf = this.Buf.slice(40,40 +this.Signature_length)
        var Sign = Sbuf.toString('hex');
        return Sign;
    }

    Display(i){
        console.log('   Input ',i+1,': ');
        console.log('       Transaction ID: ',this.Transaction_ID);
        console.log('       Index: ',this.Index);
        console.log('       Length of the signature: ',this.Signature_length);
        console.log('       Signature: ',this.Signature);
    }
    
}

module.exports = input;