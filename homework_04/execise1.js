
const { of } = require('rxjs');
//const { rxjs } = require('rxjs');
const os = require('os');
const { filter , map } = require('rxjs/operators');

function checkSystem(){
    console.log("Checking your system...");
    const cpus = os.cpus().length;
    const totalmem = os.freemem / 1024 / 1024 / 1024;    
    let result = false;
    of({cpu:cpus},{ram:totalmem})
        .subscribe(            
            (val) => {
                if (val.cpu && val.cpu < 2) {
                    result = false;
                    console.log("Processor is not supported");
                } else result = true;
                if (val.ram && val.ram < 4) {
                    result = false;
                    console.log("This app needs at least  4GB RAM.");
                } else result = true;        
            }
    );  
    if (result) console.log("Your system is successfully checked.")  
}
checkSystem();