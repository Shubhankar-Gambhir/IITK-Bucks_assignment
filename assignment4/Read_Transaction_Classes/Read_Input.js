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

module.exports = input;