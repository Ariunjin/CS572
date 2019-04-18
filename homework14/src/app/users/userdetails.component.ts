import { Component } from "@angular/core";
import { MyServiceService } from '../my-service.service';

@Component({
    selector: `app-userdetails`,
    template: `
        <h1>User details component</h1>
        <div>FullName:{{current_user.name.last}}</div>
        <div>City: {{current_user.location.city}}</div>
        <div>State: {{current_user.location.state}}</div>
    `,
    styles: [``]
})

export class UserdetailsComponent {
    title = 'Userdetails Component'
    current_user;
    constructor(private dataService:MyServiceService){}
    ngOnInit(){
        this.current_user = this.dataService.getUserDetail();
    }
}