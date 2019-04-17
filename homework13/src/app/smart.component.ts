import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-smart',
  template: `
    <p>Smart app</p>
    <div>Item: <input [value] = "newItem" (input)="newItem=$event.target.value"></div>
    <button (click)="addItem()">Add Item</button>
    <app-dumb [items]="items"></app-dumb>    
  `,
  styleUrls: ['./smart.component.css']
})
export class SmartComponent implements OnInit {
  public items = [{"id":1,name:"phone"},{"id":2,name:"tablet"},{"id":3,name:"computer"}];
  public newItem:string = "";
  constructor() {
    
   }
  addItem(){
      let newId = this.items.length +1;
      let newName:string = this.newItem;
      this.items.push({id:newId,name:newName});
      this.items = this.items.slice();
  }
  ngOnInit() {
  }

}
