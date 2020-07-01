const crypto = require('crypto');

async function find_nonce(data,target){
    var x = 1;
    var appended_data = data + String(x)
    var hash = crypto.createHash('sha256').update(appended_data).digest('hex');

    while(hash > target){
        x += 1;
        appended_data = data + String(x);
        hash = crypto.createHash('sha256').update(appended_data).digest('hex');
    }
    
    return x;
}

process.on('message', async (message) => { 
    const nonce = await find_nonce(message.data,message.target); 

    mine_json = {};
    mine_json["result"] = "found";
    mine_json["nonce"] = nonce;

    process.send({ json: mine_json });
  });