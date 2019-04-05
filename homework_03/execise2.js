var EventEmitter = require('events');

class Gym extends EventEmitter {
    constructor() {
        super();
        this.message = 'Gym class!';
    }
    callBoom(txt) {
        console.log(this.message);
        this.emit('boom',txt);       
    } 
}
var myGym = new Gym();
myGym.on('boom',function(txt){ console.log(`${txt}`); });

setInterval(() => {myGym.callBoom("Athelete is working out!");}, 1000);

