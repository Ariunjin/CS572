var http = require('http');
var fs = require('fs');
var path = require('path');
//let fileUrl = new URL('file:/Doc1.docx');

//reading file as syncronouse
var server1 = http.createServer();
server1.on('request',function(req,res){
    console.log('readFileSync solution');
    var time_spent = null;
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

// using stream
var server3 = http.createServer();
server3.on('request',function(req,res){
    console.log('Stream solution');
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
server3.listen(5000, ()=>{
    console.log('Streams is Listening on 5000');
});

/*
let http = require("http");
let fs = require("fs");
let path=require('path');

// create big file ~400 mg
// const file = fs.createWriteStream(path.join(__dirname,'./bigFile.txt'));
// for(let i=0; i<= 1e6; i++) {
//   file.write(i+ ': Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n');
// }
// file.end();
// using  buffer Asynchronous 

// We basically put the whole big.file content in memory before we wrote it out to the response object. This is very inefficient.


// using buffer Synchronous 
http.createServer(function (req, res) {
    const start = Date.now();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let file = fs.readFileSync(path.join(__dirname,'./bigFile.txt'));
    const end = Date.now();
    res.end(console.log(`readFileSync spent time : ${end - start} ms to read ${file.length} kb`));
}).listen(6000, ()=>console.log('readFileSync : Listening on 6000'));

// using asynchronous
const server = http.createServer();
const filePath=path.join(__dirname,'./bigFile.txt');
server.on('request', (req, res) => {
  const start = Date.now();
  fs.readFile(path.join(__dirname,'./bigFile.txt'), (err, data) => {
    const end = Date.now();
    if (err) throw err;  
    res.end(console.log(`readFile spent time : ${end - start} ms to read ${data.length} kb`));
  });
});
server.listen(7000,()=>console.log('readFile : Listening on 7000'));

// using Stream
http.createServer(function (req, res) {
    const start = Date.now();
   let rs  = fs.createReadStream(path.join(__dirname,'./movie.mkv')).pipe(res); 
   rs.on('end',()=>{
    end = new Date() - start;
    let response = `Stream - Time spent = ${end - start} ms`;
    console.log(`createReadStream spent time: ${response} to read ${res.length} kb`);
});
}).listen(8000,()=>console.log('createReadStream : Listening on 8000'));

*/