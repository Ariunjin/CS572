var http = require('http');
var fs = require('fs');
var path = require('path');

//reading file as syncronouse
var server1 = http.createServer();
server1.on('request',function(req,res){
    console.log('readFileSync solution');
    var start = new Date();
    const result = fs.readFileSync(path.join(__dirname,'bigFile.txt'),'utf8');
        time_spent = new Date() - start;
        let response = `reading file as syncronouse - Total time = ${time_spent} ms`;
        res.end(response);
});
server1.listen(3000,()=>{
    console.log('ReadFileSync is Listening on 3000');
});

var server2 = http.createServer();
server2.on('request',function(req,res){
    console.log('readFile solution');
    var start = new Date();
    var time_spent=null;
    fs.readFile(path.join(__dirname,'bigFile.txt'),(err,data)=>{
        console.log(data);
        this.emit('done',data);
    });
    this.on('done',(data)=>{
        time_spent=new Date()-start;
        let response = `readFile - Time spent = ${time_spent} ms`;
        res.end(response+'\n',()=>{
            time_spent=new Date()-time_spent;
            response = `browserLoad - Time spent = ${time_spent} ms`;
            console.log(response);    
        });
    })
});
server2.listen(4000,()=>{
    console.log('ReadFile is Listening on 4000');
});

const server3 = http.createServer();

server3.on('request',function(req,res){
    console.log('createReadStream solution');   
    var time_spent=null;
    var start = new Date();
    var rs0 = fs.createReadStream(path.join(__dirname,'bigFile.txt'));
    rs0.pipe(res);
    rs0.on('end',()=>{
        time_spent = new Date() - start;
        let response = `Stream - Time spent = ${time_spent} ms`;
        console.log(response);
    });
});
server3.listen(5000,()=>console.log('createReadStream listening on 5000'));