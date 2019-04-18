import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  //localStorage;
  currentUser;  
  users;
  constructor(public http: HttpClient) {
    // this.router.params.subscribe((item) => {
    //     let uuid = item.uuid;
    //     console.log(item)
    // })

}
  getOnlineData() {   
    return this.http.get('https://randomuser.me/api/?results=10');  
  }
  getCachedData(){
    this.users = JSON.parse(localStorage.getItem('users'));
    return this.users;
  }
}
