//dependencies
const express = require('express');
//const fetch = require('node-fetch');
const axios = require('axios');
let app = express();
// setup
app.set('case sensitive routing',true);
app.set('strict routing',true);
app.set('trust proxy',true);

app.get('/users', function(req,res){
    async function getData(){
        try{
            let result = await axios.get('https://randomuser.me/api/?results=10');
            let data = result.data;
            console.log(`${result.data.info.page}`);
            res.set({
                'Cache-control': 'private, max-age=86400',
                'Last-Modified': new Date(),
                'Link': `<https://randomuser.me/api/?page=1&results=10>; rel="first",` +
                    `<https://randomuser.me/api/?page=${result.data.info.page + 1}&results=10&seed=${result.data.info.seed}>; rel="next",` +
                    `<https://randomuser.me/api/?page=${result.data.info.page - 1}&results=10&seed=${result.data.info.seed}>; rel="prev"`
            });      
            res.send(data);
            res.end();
        }
        catch(err) {     
            console.log(err);
            res.end();
        }     
    }
    getData();
});
// initialize
app.listen(4000,()=>console.log('Listening 4000'));