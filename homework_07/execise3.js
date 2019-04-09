let express=require('express');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
let cors=require('cors');

let app=express();
app.use(express.json());
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) 
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());

var urlencodedParser = express.urlencoded({extended: true});
app.use(urlencodedParser);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user01:987654321@cluster0-gougl.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

let db;
let collection;
client.connect(err => {
  if (err) throw err;
  db = client.db('homework07');
  collection = db.collection('lectures'); 
  //client.close();
});

// get ALL
app.get('/lectures', function(req,res){   
    collection.find({},{_id:0}).toArray().then(result =>  {
        res.json(result);
        res.end();})
        .catch(err => console.log(err)); 
});

// get One by course name
app.get('/lectures/:course', function(req,res){   
  collection.find({course:req.params.course},{_id:0}).toArray((err,arr) =>  {
      res.json(arr);
      res.end();
  });     
});

// post
app.post('/lectures',function(req,res){ 
  collection.insertOne(req.body);
  collection.find().toArray((err,arr) =>  {
    if (err) throw err;
    res.json(arr);
    res.end();
  });  
});

// delete
app.delete('/lectures/:course',function(req,res){ 
  collection.deleteOne(req.body);
  collection.find().toArray((err,arr) =>  {
    if (err) throw err;
    res.json(arr);
    res.end();
  });  
});

// put
app.put('/lectures/:course',function(req,res){ 
  const myquery={course:req.params.course};
  var newvalues = { $set: req.body };
  collection.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("UpdateOne:");        
    });   
  collection.find().toArray((err,arr) =>  {
    res.json(arr);
    res.end();
  });  
});

app.get('/search/:q',function(req,res){  
  const patt = req.params.q; 
  collection.find({lecture:{$regex:patt}}).toArray((err,arr) =>  {
    if (err) throw err;
    res.json(arr);
    res.end();
  });  
});

//boot-up
app.listen(5000,()=>console.log('Listening on 5000'));