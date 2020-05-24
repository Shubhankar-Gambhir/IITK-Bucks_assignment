const prompt = require('prompt-sync')({sigint: true});
const crypto = require('crypto');

const input = require('./Create_Input');
const output = require('./Create_Output');

class transaction{
    Num_Input = Number(prompt('No of Inputs: '));
    Input_Data_Buf = this.Input_Data;
    Num_Output = Number(prompt('No of Outputs: '));
    Output_Data_Buf = this.Output_Data;
    ID = crypto.createHash('sha256').update(Uint8Array.from(this.Buf)).digest('hex');
    Size = this.Buf.byteLength;
    get Input_Data(){
        var arr = [];
        for (var i = 0;i < this.Num_Input;i++){
            console.log('Input: ',i+1)
            var new_Input = new input();
           arr.push(new_Input.Buffer);
        }
        return Buffer.concat(arr)
    }
    get Output_Data(){
        var arr = [];
        for (var i = 0;i < this.Num_Output;i++){
            console.log('Output: ',i+1)
            var new_Output = new output();
           arr.push(new_Output.Buffer);
        }
        return Buffer.concat(arr)
    }
    get Buf(){
        var Input_buf = Buffer.alloc(4);
        Input_buf.writeUInt32BE(this.Num_Input,0,4);
        var Output_buf = Buffer.alloc(4);
        Output_buf.writeUInt32BE(this.Num_Output,0,4);
        var buf = [Input_buf,this.Input_Data_Buf,Output_buf,this.Output_Data_Buf];
        buf = Buffer.concat(buf);
        return buf;
    }
}

module.exports = transaction;