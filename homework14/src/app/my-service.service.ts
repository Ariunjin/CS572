import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  users:any;
  userId:any;
  current_user;
  emitter = new EventEmitter<string>();
  constructor(public http: HttpClient, private router: ActivatedRoute, private route: Router) {
    this.router.params.subscribe(params => {this.userId = params['uuid'];});
  }
  getOnlineData() {   
    return this.http.get('https://randomuser.me/api/?results=10');  
  }
  getCachedData(){
    this.users = JSON.parse(localStorage.getItem('users'));
    return this.users;
  }
  
  getUserDetail() {
    return this.current_user;
  }
  emitValue(value: string) {
    this.emitter.emit(value);
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const uuid = route.params.uuid;
    console.log(route.params)
    let arr = this.getCachedData()
    arr.forEach((item) => {
        if (item.login.uuid === uuid) {
            console.log('user found')
            this.current_user=item;
            return true;
        }
    })
    if (this.current_user == null) {
        this.route.navigate(['users']);
        console.log('User could not found' + this.userId);
        return false;
    }
    else return true;    
  }
}
