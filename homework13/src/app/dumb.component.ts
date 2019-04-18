import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dumb',
  template: `
    <p>Dumb app </p>
    <ul>
      <li *ngFor="let item of items;">{{item.id}}.{{item.name}}</li>
      <p></p>
      <input [value] = "isVisible" (input)="isVisible=$event.target.value">
      <div appIsVisible [hidden]="isVisible">Is visible directive</div>      
      <div appMakeBigger>Mouse leave is making this text bigger and bigger</div>
    </ul>
  `, 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbComponent implements OnChanges {
  @Input() items:{id:string,name:string}[];
  isVisible:boolean = false;
  constructor() { 
  }
  ngOnChanges(){
    console.log("ngOnChanges called! ");      
  }

}
