import { Component } from "@angular/core";
import { MyServiceService } from '../my-service.service';

@Component({
    selector: `app-users`,
    template: `
        <div *ngFor="let user of users">Id: {{user.id.value}},Name: {{user.name.first}},Email: {{user.email}},</div>            
        <app-userdetails><\app-userdetails>   
        
    `,
    styles: [``]
})
export class UsersComponent{
    title = 'Users component';
    users;
    constructor(private dataService: MyServiceService){ 
        
    }
    ngOnInit(){
        this.users = this.dataService.getCachedData();
    }
   
}