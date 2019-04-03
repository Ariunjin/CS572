var dns = require('dns');
const hostname = "www.mum.edu";

// using resolve
dns.resolve4(hostname, (err,addresses) => {
    if (err) throw err;
    console.log("using resolve4: " + addresses[0]);
});

// using promise
const lookupPromise = new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err,addresses) => {
        if (err) throw reject(err);
        resolve(addresses[0]);
    });
});
lookupPromise.then(res => console.log('using promise: ' + res)).catch(err => console.error(err));

// using promisify
const {promisify} = require('util');
const showIP = promisify(dns.resolve4);
showIP(hostname).then(res => console.log('using promisify: ' + res)).catch(err => console.log(err));


// using async / await
async function asyncAwait(){
    try{
        const result = await showIP(hostname);       
        console.log("using async/await: " + result);      
    } catch(err){
        console.log(err);
    }
};
asyncAwait();

