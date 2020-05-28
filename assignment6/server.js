const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

let data = new Map()
let peer = ['http://8c0090bc.ngrok.io' ,'http://52d3004ed431.ngrok.io'] //temporary urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/add',function(req,res){
    var Key = req.body.key;
    var Value = req.body.value;
    if(data.has(req.body.key)===false){
        data.set(req.body.key,req.body.value);
        console.log('Set '+Key+' : '+Value);
        for(let Url of peer){
            axios.post( Url +'/add',{
                    key : Key,
                    value : Value
            },{headers: {'Content-Type': 'application/json'}
            })
            .then(function(res){
                console.log('Sent '+Key+' : '+Value+' to '+Url);
                console.log('Response from '+Url+' : '+res);
            })
            .catch(function(error){
                console.error(error.response.request._response );
            })  
        }
        res.send('Set '+Key+' : '+Value);
    }
    else{
        res.send('Key data already exist');
    }        
})

app.get('/list',function(req,res){
    console.log('_____List_____');
    let obj = Object.fromEntries(data);
    console.log(JSON.stringify(obj,null,1));
    res.json(obj);
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("server listening at http://%s:%s", host, port)
})
