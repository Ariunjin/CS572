//dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const json = express.json();
app.use(json);
app.use(bodyParser.urlencoded({extended: true}));
//app.use('/api',require('./routes.js'));

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
});


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
    coll.insertOne(req.body, function(err,doc){
      if(err) console.log(err);
      console.log(doc);
    }); 
    coll.find().toArray().then(result =>  {
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});

app.get('/near', (req,res) => {     
  coll.find({location: {$near: [-91.9612747,41.0132949]}}).limit(3)
  .toArray().then(result =>  {
    res.json(result);
    res.end();
  })
  .catch(err => console.log(err)); 
});
//boot-up
app.listen(5000,()=>console.log('Listening on 5000'));