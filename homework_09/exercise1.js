//dependencies
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });  

let db;
let zips;

client.connect(err => {
  db = client.db('CS572');
  zips = db.collection('zipcodes'); 

  //zips.aggregate([{$match:{state:'WA'}}]).toArray().then(result=>console.dir(result));
   
  //zips.aggregate([{$match:{pop:{$lt:5000}}}]).toArray().then(result=>console.dir(result));

  // zips.aggregate([
  //   {$group:{_id: {"state":"$state","city":"$city"},zip_count:{$sum:1}}}
  //   ,{$match: {zip_count:{$gt:1}}}
  //   ,{$sort: {state:1,city:1}}]).toArray().then(result=>console.dir(result));

  // zips.aggregate([
  //   {$group: {_id: {"state":"$state","city":"$city"},pop:{$sum:"$pop"}}},
  //   {$sort: {state:1,pop:-1}},
  //   {$group: {_id: {"state":"$_id.state"},city:{$first: "$_id.city"},pop:{$first:"$pop"}}}
  // ]).toArray().then(result=>console.dir(result));
});

// get by STATE
app.get('/query1', function(req,res){   
  zips.aggregate([{$match:{state:'IA'}}]).limit(20).toArray().then(
    result=>  {
      res.json(result);
      res.end();
    }
    );
});

// get by STATE population less than 5000
app.get('/query2', function(req,res){   
  zips.aggregate([{$match:{pop:{$lt:5000}}}])
  .limit(20)
  .toArray().then(
    result=>  {
      res.json(result);
      res.end();
    }
    );
});

// get by more than one zip
app.get('/query3', function(req,res){   
    zips.aggregate([
    {$group:{_id: {"state":"$state","city":"$city"},zip_count:{$sum:1}}}
    ,{$match: {zip_count:{$gt:1}}}
    ,{$sort: {state:1,city:1}}])
  .toArray().then(
    result=>  {
      res.json(result);
      res.end();
    }
    );
});

// get by STATE least populated city
app.get('/query4', function(req,res){   
  zips.aggregate([
    {$group: {_id: {"state":"$state","city":"$city"},pop:{$sum:"$pop"}}},
    {$sort: {state:1,pop:-1}},
    {$group: {_id: {"state":"$_id.state"},city:{$first: "$_id.city"},pop:{$first:"$pop"}}}
  ])
  .toArray().then(
    result=>  {
      res.json(result);
      res.end();
    }
    );
});
//boot-up
app.listen(3000,()=>console.log('Listening on 3000'));