const express = require('express');
const app = express();
let message = '';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01',{useNewUrlParser:true});

client.connect(function(err) {
    const db = client.db('homework01');
    const collection = db.collection('data');
    collection.findOne({},{key:1,message:1}, function(err,doc){
        const simpleEnc = require('simple-encryptor')(doc.key);
        message =  simpleEnc.decrypt(doc.message);        
    });   
});

app.get('/secret', function(req,res){    
    console.log('get request');
    res.json(message);
    res.end();
});

//boot-up
app.listen(4000,()=>console.log('Listening on 4000'));



