var crypto = require('crypto')

const input = require('./Read_Input');
const output = require('./Read_Output');

class transaction{
    constructor(Byte){
        this.Byte = Byte;
    }

    get Transaction_ID(){
        var ID = crypto.createHash('SHA256').update(this.Byte).digest('hex');
        return ID;
    } 
    get Num_Input(){
        var N_Input = this.Byte.slice(0,4).readUInt32BE(0);
        return N_Input;
    }
    get Input_Data(){
        var Data_Arr = [];
        var Buf = this.Byte.slice(4)
        for(var i = 0; i < this.Num_Input;i++){
            var New_Input = new input(Buf);
            Data_Arr.push(New_Input);
            Buf = New_Input.New_buf ;
        }
        return Data_Arr;
    }
    get Num_Output(){
        var N_Output = this.Input_Data[this.Num_Input-1].New_buf.slice (0,4).readUInt32BE(0);
        return N_Output;
    }
    get Output_Data(){
        var Data_Arr= [];
        var Buf = this.Input_Data[this.Num_Input-1].New_buf.slice(4);
        for(var i = 0; i < this.Num_Output;i++){
            var New_Output = new output(Buf);
            Data_Arr.push(New_Output);
            Buf = New_Output.New_buf ;
        }
        return Data_Arr;
    }
    
    Display(){
        console.log('Transaction_ID: ',this.Transaction_ID);
        console.log('No of Input: ',this.Num_Input);
            for(var i = 0; i < this.Num_Input;i++){
                this.Input_Data[i].Display(i)
            }
        console.log('No of Output: ',this.Num_Output);
            for(var i = 0; i < this.Num_Output;i++){
               this.Output_Data[i].Display(i)
            }
    }
}

module.exports = transaction;
