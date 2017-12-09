import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  domain="http://localhost:8080";
  //domain="https://mean-project-pejmansaberin.c9users.io:8080"; //cloud 9
  authToken;
  user;
  options;

  constructor(private http: Http)
  { }

  //this function is used to grab the token, it checks for user if they have to be logged in to access something
  //like profile pege had be authenticated to be able to acces the page. Token is attached to the headers
  createAuthenticationHeaders(){
    this.loadToken();
    this.options=new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    })
  }
  //this grabs the token from the localStorage in browser
  loadToken(){
    const token=localStorage.getItem('token');
    this.authToken=token;
  }

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
  getProfile(){
    this.createAuthenticationHeaders(); //this will grab the token in the authentication Headers
    return this.http.get(this.domain+'/authentication/profile',this.options).map(res=>res.json()); //this options is contains token and it is set in createAuthenticationHeaders

  }



}
