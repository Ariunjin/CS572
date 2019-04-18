import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  users:any;
  constructor(public http: HttpClient) {}
  getOnlineData() {   
    return this.http.get('https://randomuser.me/api/?results=10');  
  }
  getCachedData(){
    this.users = JSON.parse(localStorage.getItem('users'));
    return this.users;
  }
}
