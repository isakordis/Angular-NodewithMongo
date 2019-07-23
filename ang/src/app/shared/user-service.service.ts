import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { UserClass } from './user-class.model'
import { callbackify } from 'util';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  selectedUser: UserClass;
  users: UserClass[];
  readonly baseURL = 'http://localhost:3000/list';
  constructor(private http: HttpClient) { }

  postUser(usr: UserClass) {
    return this.http.post(this.baseURL, usr);
  }

  getUserList() {
    return this.http.get(this.baseURL + "/");
  }

  postNewUser(user: UserClass) {
    console.log(user);
    console.log(this.baseURL);
    return this.http.post(this.baseURL, user);

  }
  // putUser(user:UserClass){
  //   return this.http.put(this.baseURL+`/${user.name}`,user);
  // }
  updateUser(user:UserClass) {
   return this.http.put(this.baseURL+`/${user._id}`,user);   
  }

  deleteUser(_id:string){
    console.log(this.baseURL+`/${_id}`);
    return this.http.delete(this.baseURL+`/${_id}`);
  }
}