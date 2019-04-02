   
Array.prototype.even = async function even(){
    try {  
        const res = await this.filter(n=>n%2===0);
        console.log(res);
    } catch(err) {
        console.log(err);
    }
}
Array.prototype.odd = async function odd(){
    try {  
        const res = await this.filter(n=>n%2===1);
        console.log(res);
    } catch(err) {
        console.log(err);
    }
}

console.log('start');
[1,2,3,4,5,6,7,8].even();
[1,2,3,4,5,6,7,8].odd();
console.log('end');

