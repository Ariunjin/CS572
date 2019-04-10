//dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });  
const data = [
    {
        "name": "MUM",
        "category":"University",
        "location": [
          -91.9665342,
            41.017654
        ]    
    },
  {
      "name": "Everybody's Whole Foods",
      "category":"Natural goods store",
      "location": [
        -91.9684491,
          41.0103777
      ]    
  },
  {
      "name": "Carnegie Historical Museum",
      "category":"History Museum",
      "location": [
        -91.9591732,
          41.0129365          
        ]   
  },    {
      "name": "Golden Dome Market and Cafe",
      "category":"Health food store",
      "location": [
        -91.9586948,
        41.0169001          
      ]    
  }
];

let db;
let coll;

client.connect(err => {
  db = client.db('CS572');
  coll = db.collection('locations'); 
  coll.createIndex({"location":'2d'});
  //coll.deleteMany({name: {$regex: /!MUM/}});
//   coll.insertMany(data, function(err,docInserted){
//    console.dir(`Success ${docInserted}`);
//   });
});
app.use('/api',require('./routes.js'))

// get all locations
app.get('/locations', function(req,res){   
    coll.find().toArray().then(result =>  {
        res.json(result);
        res.end();
    })
    .catch(err => console.log(err)); 
});

// post
app.post('/locations', (req,res) => {     
  coll.insertOne(req.body); 
  coll.find().toArray().then(result =>  {
    res.json(result);
    res.end();
})
.catch(err => console.log(err)); 
});


//boot-up
app.listen(5000,()=>console.log('Listening on 5000'));