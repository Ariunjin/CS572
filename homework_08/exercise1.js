//dependencies
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });  

let db;
let collection;

client.connect(err => {
  db = client.db('CS572');
  collection = db.collection('restaurants'); 
});
// get all restaurants
app.get('/query1', function(req,res){   
    collection.find().limit(10).toArray().then(result =>  {
        res.json(result);
        res.end();
    })
    .catch(err => console.log(err)); 
});

app.get('/query2', function(req,res){   
  collection.find({}).project({address: 0,grades: 0}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});

app.get('/query3', function(req,res){   
  collection.find({}).project({"_id": 0,address: 0,grades:0}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query4', function(req,res){   
  collection.find({}).project({"_id":0,restaurant_id:1,name:1,district:1,"address.zipcode":1}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })  
  .catch(err => console.log(err)); 
});

app.get('/query5', function(req,res){   
  collection.find({district:"Bronx"}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })  
  .catch(err => console.log(err)); 
});

app.get('/query6', function(req,res){   
  collection.find({district:"Bronx"}).limit(5).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })  
  .catch(err => console.log(err)); 
});

app.get('/query7', function(req,res){   
  collection.find({district:"Bronx"}).skip(5).limit(5).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })  
  .catch(err => console.log(err)); 
});

app.get('/query8', function(req,res){   
  collection.find({ "address.coord": { $gt: -95.754168}}).limit(10).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })  
  .catch(err => console.log(err)); 
});

app.get('/query9', function(req,res){   
  collection.find({"address.coord": {$lt: -65.754168},"grade.score":{$gt:70},'cuisine':{$ne:["American "]}}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })  
  .catch(err => console.log(err)); 
});

app.get('/query10', function(req,res){   
  collection.find({name: {$regex: /^Wil/}}).project({"_id": 0,address: 0,grades:0}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query11', function(req,res){   
  collection.find({name: {$regex: /ces$/}}).project({"_id": 0,address: 0,grades:0}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query12', function(req,res){   
  collection.find({name: {$regex: /Reg/}}).project({"_id": 0,address: 0,grades:0}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});

app.get('/query13', function(req,res){   
  collection.find({district:"Bronx",cuisine:{$in:["American ","Chinese"]}}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })  
  .catch(err => console.log(err)); 
});

app.get('/query14', function(req,res){   
  collection.find({district: {$in: ["Staten Island","Queens","Bronx","Brooklyn"]}}).project({"_id": 0,address: 0,grades:0}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});

app.get('/query15', function(req,res){   
  collection.find({district: {$ne: ["Staten Island","Queens","Bronx","Brooklyn"]}}).project({"_id": 0,address: 0,grades:0}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query16', function(req,res){   
  collection.find({"grades.score": {$lte: 10}}).project({"_id":0,restaurant_id:1, name:1, district:1, cuisine:1}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query17', function(req,res){   
  collection.find({"address.coord.1":{$gt:42,$lt:50}}).project({"_id":0,restaurant_id:1, name:1, address:1, coord:1}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});

app.get('/query18', function(req,res){   
  collection.find().sort({name:1}).limit(10).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query19', function(req,res){   
  collection.find().sort({name:-1}).limit(10).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query20', function(req,res){   
  collection.find().sort({name:1,district:-1}).limit(10).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query21', function(req,res){   
  collection.find({"address.street":{$exists:false}}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query22', function(req,res){   
  collection.find({"address.coord":{$type:"double"}}).toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
app.get('/query23', function(req,res){   
  collection.aggregate([{$match:{name: {$regex: /^Mad/}}},{$project: {name:1, district:1, longitude: {$arrayElemAt: ["$address.coord", 0]}, latitude: {$arrayElemAt:["$address.coord", 1]}, cuisine:1}}])
  //collection.find({name: {$regex: /^Mad/}}).project( {"_id":0,name:1, district:1,"address.coord":1, cuisine:1})
  .toArray().then(result =>  { 
      res.json(result);
      res.end();
  })
  .catch(err => console.log(err)); 
});
//boot-up
app.listen(3000,()=>console.log('Listening on 3000'));