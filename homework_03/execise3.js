var http = require('http');
var fs = require('fs');
var path = require('path');
var server1 = http.createServer();
//reading file as syncronous
var movie = fs.readFileSync(path.join(__dirname,'movie.mkv'),'utf8');
console.log('sync read is done!');

//reading file as asyncronous
var movie2 = fs.readFile(path.join(__dirname,'movie.mkv'),'utf8',
    function(err,data){console.log('Async read done!')});

console.log(movie2);
console.log('Done!');