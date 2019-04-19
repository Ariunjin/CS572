import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserdetailsComponent } from './userdetails.component';
import { MyServiceService as Guard }  from '../my-service.service';

@NgModule({
  declarations: [UsersComponent,UserdetailsComponent],
  imports: [CommonModule,RouterModule.forChild( [
    {path: '',component:UsersComponent}, 
    {path:'users/:uuid', component: UserdetailsComponent, canActivate: [Guard]}
  ])] ,
  providers: [],
  bootstrap: []
})
export class UsersModule { }
