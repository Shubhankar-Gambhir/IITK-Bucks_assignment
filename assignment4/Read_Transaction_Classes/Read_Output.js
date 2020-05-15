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
        var Nbuf = this.Buf.slice(12 + this.CalcLen(),);

        return Nbuf;
    }
    
}

module.exports = output;