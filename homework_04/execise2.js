let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');

const server = http.createServer();

server.on('request', (req, res) => {
  const urlObj = url.parse(req.url);
  //const path = urlObj.query.path;
  console.log(urlObj);
  fs.readFile(path.join(__dirname,'./file.txt'), (err, data) => {
    if (err) throw err; 
    res.end(data);
  });
});

server.listen(4000,()=>console.log('Listening on 4000'));
//