import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  outputs: ['onChangeValue'],
  template: `    
  <p> Enter number: 
  <input name="counterInput" [value] = "counter" (input)="counter=$event.target.value" (keyup)="update()">
      <button (click)="increase()">+</button>
      {{countervalue}}
      <button (click)="decrease()">-</button>
    </p>
  `,
  styles: []
})
export class CounterComponent implements OnInit {
  private countervalue;
  @Input() public  counter;
  onChangeValue:EventEmitter<number>;
  constructor() { 
    this.countervalue = 0;
    this.onChangeValue = new EventEmitter();
  }

  increase(){
    this.onChangeValue.emit(++this.countervalue);
    return this.countervalue;    
  }
  decrease(){    
    this.onChangeValue.emit(--this.countervalue);
    return this.countervalue;
  }
  ngOnInit() {
    this.countervalue = this.counter
  }  
  update(){
    this.countervalue = this.counter;
    this.onChangeValue.emit(this.countervalue);
  }

}
