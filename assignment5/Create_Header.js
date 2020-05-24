const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const crypto = require('crypto');
const now = require('nano-time')

class Block_Header{
    Index = Number(prompt('Index: '));
    Parent_Hash = prompt('Hash of Parent Block: ');
    Target = prompt('Target: ');
    Block_Body_File = prompt('Block Body: ');
    Block_Body = fs.readFileSync(this.Block_Body_File);
    Body_Hash = crypto.createHash('SHA256').update(this.Block_Body).digest('hex');
    Initial_timestamp = BigInt(now.micro());
    Header_Buf = this.H_Buf;
    Final_timestamp = this.Header_Buf.slice(100,108).readBigUInt64BE(0);
    Nonce = this.Header_Buf.slice(108,116).readBigUInt64BE(0);
    Time_taken = (this.Final_timestamp - this.Initial_timestamp) / 1000000;
    get Time_Stamp(){
        var time = BigInt(now.micro());
        return time;
    }

    Buf(i){
        var Index_buf = Buffer.alloc(4);
        Index_buf.writeUInt32BE(this.Index,0,4);
        var Parent_Hash_buf = Buffer.alloc(32,this.Parent_Hash,'hex');
        var Body_Hash_buf = Buffer.alloc(32,this.Body_Hash,'hex');
        var Target_Hash_buf = Buffer.alloc(32,this.Target,'hex');
        var Time_Stamp_buf = Buffer.alloc(8);
        Time_Stamp_buf.writeBigUInt64BE(this.Time_Stamp,0,8);   
        var Nonce_buf = Buffer.alloc(8);
        Nonce_buf.writeBigUInt64BE(BigInt(i),0,4);
        var arr = [Index_buf,Parent_Hash_buf,Body_Hash_buf,Target_Hash_buf,Time_Stamp_buf,Nonce_buf] ;
        var buf = Buffer.concat(arr);
        return buf; 
    }

    get H_Buf(){
        var i = 1;
        var new_buf = this.Buf(i);
        var hash = crypto.createHash('sha256').update(Uint8Array.from(new_buf)).digest('hex');
        while(hash > this.Target){
            i += 1;
            new_buf = this.Buf(i);
            hash = crypto.createHash('sha256').update(Uint8Array.from(new_buf)).digest('hex');
        }

        return new_buf;
    }
}

module.exports = Block_Header;