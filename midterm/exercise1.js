const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//db connection
const url = 'mongodb://localhost:27017';
let db = mongoose.connect(url).db;

// routes
app.get('/zips/:id', (req,res) => {
  getPromise(req.params.id).then(data => res.send(data))
  .catch(err => console.log(err));
});

// promise
const getPromise = (zipcode) => {
  return new Promise( function(resolve,reject){
    if (db) {
        db.collection('zipcodes')
        // .find({"_id":new ObjectId(zipcode)})  // if collection has a auto generated _id
        .find({"_id":zipcode})        
        .toArray((err,data) => {
          if (err) reject(error);
          resolve(data);
        });
    } else {
      reject('error to connect to the database!');
    }
  });
}


app.listen(3000,()=>console.log("Listening on 3000"));