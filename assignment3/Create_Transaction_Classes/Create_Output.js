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
        //var Coins_1 = this.coins >> 32 ;
        //var Coins_2 = this.coins - Coins_1 << 32 ;
        var biguint = BigInt(this.Coins);
        var Cbuf = Buffer.alloc(8);
        Cbuf.writeBigUInt64BE(biguint,0,8);
        var Lbuf = Buffer.alloc(4);
        Lbuf.writeUInt32BE(this.Length,0,32);
        var Pbuf = Buffer.alloc(this.Length,this.Public_key,"utf-8");
        var arr = [Cbuf,Lbuf,Pbuf] ;

        var buf = Buffer.concat(arr);

        return Buffer.concat(arr)
    }

}

module.exports = output;