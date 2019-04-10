const express = require('express');
const app = express.Router();

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

app.get('/near', (req,res) => {     
  coll.find({location: {$near: [-91.9612747,41.0132949]}}).limit(2)
  .toArray().then(result =>  {
    res.json(result);
    res.end();
  })
  .catch(err => console.log(err)); 
});
module.exports = app;