/*var fs = require('fs');
var path = require('path');
var http = requre('http');
var server1 = http.createServer();
var file1 = fs.readFileSync(path.join(__dirname,'1.txt'),'utf8');
console.log(file1);

var file2 = fs.readFile(path.join(__dirname,'2.txt'),'utf8',
    function(err,data) {console.log(data)}
);
var readable = fs.createWriteStream(path.join(__dirname,'movie.mkv'), {encoding : 'utf8', highWaterMark: 16*1024});
readable.on('data',function(chunk){
    console.log(chunk.length);
});
console.log('Done!');*/

var http = require('http');
var fs = require('fs');
var path = require('path');
let fileUrl = new URL('file:/Doc1.docx');

//reading file as syncronouse
var server1 = http.createServer();
server1.on('request',function(req,res){
    console.log('readFileSync solution');
    var time_spent = null;
    var start = new Date();
    const result = fs.readFileSync(path.join(__dirname,'Doc1.docx'),'utf8');
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
    fs.readFile(path.join(__dirname,'Doc1.docx'),(err,data)=>{
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

// using stream
var server3 = http.createServer();
server3.on('request',function(req,res){
    console.log('Stream solution');
    var time_spent=null;
    var start = new Date();
    var rs0 = fs.createReadStream(path.join(__dirname,'Doc1.docx'));
    rs0.pipe(res);
    rs0.on('end',()=>{
        time_spent = new Date() - start;
        let response = `Stream - Time spent = ${time_spent} ms`;
        console.log(response);
    });
});
server3.listen(5000, ()=>{
    console.log('Streams is Listening on 5000');
});