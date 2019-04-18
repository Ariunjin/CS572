import { Component } from '@angular/core';
import { MyServiceService } from './my-service.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>HOME APP COMPONENT</h1>    
    <p><a [routerLink]="['']">Home</a></p>
    <p><a [routerLink]="['users']">Load users component</a></p>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'homework14';
  constructor(private dataService:MyServiceService){}

  ngOnInit() {
    console.log('getting data');
    this.dataService.getOnlineData()
    .subscribe((data) => {
      localStorage.setItem('users',JSON.stringify(data['results']));
    });
  }
}
