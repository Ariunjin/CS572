import { Component, ViewChild, ContentChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-counter counter="{{ComponentCounterValue}}" (onChangeValue)="updateCounterValue($event)"></app-counter>
  
    Component counter value = {{ComponentCounterValue}}
    `,
  styles: [``]
})
export class AppComponent {
  public ComponentCounterValue:number = 100;
 
 updateCounterValue(e:number){
  this.ComponentCounterValue = e;
 }
  title = 'homework12';
}
