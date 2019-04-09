//dependencies
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const cors = require('cors');
const bodyParser = require('body-parser');
const grades = [{id: '1', name: "Asaad Saad",course:"CS572",grade:95},
{id:'2',name:"Tso",course:"CS572",grade:97},
{id:'3',name:"Ari",course:"CS572",grade:99}];
//instantation init
let app = express();

//configuration setup
app.set('case sensitive routing',true);
app.set('strict routing',true);
app.set('case sensitive routing',true);
app.set('trust proxy',true);
//middleware
app.use(morgan('combined',accessLogStream));
app.use(bodyParser.json());
app.use(cors());
//routing
app.get('/grade', function(req,res,next){
    console.log('get request');
    res.json(grades);
});

app.get('/grade/:id', function(req,res,next){
    const filterId = req.params.id;    
    console.log('get request ');
    res.json(grades.filter(n => n.id === filterId));
});

app.post('/grade',function(req,res){
    grades.push(req.body);    
    res.send(grades);
    res.end();
});

app.delete('/grade/:id', function(req,res){
    console.log(req.params.id); 
    let index = -1;         
    for(i = 0; i < grades.length; i++){
        if (grades[i].id === req.params.id) index = i;
    }    
    if (index > -1) {
        grades.splice(index,1);    
        res.send(grades);
    }
    res.end();
});

app.put('/grade',function(req,res){
    let index = -1;         
    for(i = 0; i < grades.length; i++){
        if (grades[i].id === req.params.id) index = i;
    }  
    if (index == -1) {
        grades.push(req.body);    
        res.send(grades);
        res.end();
    } else {
        grades[index] = req.body;
        res.send(grades);
        res.end();
    }
});
//boot-up
app.listen(3000,()=>console.log('Listening on 3000'));