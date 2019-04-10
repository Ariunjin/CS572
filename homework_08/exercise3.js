//dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });  
const data = [
  {
      "name": "Everybody's Whole Foods",
      "category":"Natural goods store",
      "location": [
          41.0103777,
          -91.9684491
      ]    
  },
  {
      "name": "Carnegie Historical Museum",
      "category":"History Museum",
      "location": [
          41.0129365,
          -91.9591732
        ]   
  },    {
      "name": "Golden Dome Market and Cafe",
      "category":"Health food store",
      "location": [
          41.0169001,
          -91.9586948
      ]    
  }
];

let db;
let coll;

client.connect(err => {
  db = client.db('CS572');
  coll = db.collection('locations'); 
  //coll.deleteMany({name: {$regex: /!MUM/}});
  // coll.insertMany(data, function(err,docInserted){
  //  console.dir(`Success ${docInserted}`);
  // });
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
  console.dir(req.body);
  coll.insertOne(req.body); 
  coll.find().toArray().then(result =>  {
    res.json(result);
    res.end();
})
.catch(err => console.log(err)); 
});


//boot-up
app.listen(5000,()=>console.log('Listening on 5000'));