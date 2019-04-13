class University{
    constructor(public name:string, public dept:string){};
    graduation(year:number){
        console.log(`Graduating ${this.name} ${this.dept} ${year} students.` );
    }
}
var mum = new University("MUM","Computer Science");
mum.graduation(2019);