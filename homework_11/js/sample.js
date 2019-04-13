"use strict";
class University {
    constructor(name, dept) {
        this.name = name;
        this.dept = dept;
    }
    ;
    graduation(year) {
        console.log(`Graduating ${this.name} ${this.dept} ${year} students.`);
    }
}
var mum = new University("MUM", "Computer Science");
mum.graduation(2019);
