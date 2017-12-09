import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  //domain="http://localhost:8080";
  domain="https://mean-project-pejmansaberin.c9users.io:8080"; //cloud 9 
  authToken;
  user;

  constructor(private http: Http)
  { }

  registerUser(user){
     return this.http.post(this.domain+'/authentication/register', user).map(res=>res.json());
  }

  checkUsername(username){
     return this.http.get(this.domain+'/authentication/checkUsername/'+ username).map(res=>res.json());
  }

  checkEmail(email){
    console.log('this is email'+email);
     return this.http.get(this.domain+'/authentication/checkEmail/'+ email).map(res=>res.json());
  }
  
  login(user){
    return this.http.post(this.domain+'/authentication/login',user).map(res=>res.json());
  }
  
  
  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }



}
