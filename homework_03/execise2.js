var EventEmitter = require('events');

class ComproStudent extends EventEmitter {
    constructor() {
        super();
        this.message = 'New Student!';
    }
    visit() {
        console.log(this.message);
        this.emit('newStudent',' Ari');
    } 
}

var student = new ComproStudent();
student.on('newStudent',function(name){console.log(`Hello, ${name}`)});
student.visit();