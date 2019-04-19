import { Component } from "@angular/core";
import { MyServiceService } from '../my-service.service';

@Component({
    selector: `app-users`,
    template: `
        <div *ngFor="let user of users">
        <a [routerLink]="['users',user.login.uuid]">
        Id: {{user.id.value}},Name: {{user.name.first}},Email: {{user.email}}
        </a>
        </div>            
        `,
    styles: [``]
})
export class UsersComponent{
    title = 'Users component';
    users:any;
    constructor(private dataService: MyServiceService){ }  
    ngOnInit(){
        this.users = this.dataService.getCachedData();
    }
   
}