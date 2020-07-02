
const express = require('express');
const bodyParser = require ('body-parser');
const { fork } = require('child_process');

const target = '0000000f00000000000000000000000000000000000000000000000000000000' ;

const app = express();

app.use (bodyParser.json());

app.post('/start', function(req,res){
    res.sendStatus(200);
    mine_json = {};
    mine_json["result"] = "searching";
    mine_json["nonce"] = -1;
    process = fork('./find_nonce.js')
    const data = req.body.data

    process.send({ data,target });   // listen for messages from forked process

    process.on('message', (message) => {
        mine_json = message.json
    }); 
})

app.get('/result',function(req,res){
    res.json(mine_json);
})


var server = app.listen(2000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("server listening at http://%s:%s", host, port);
})
