import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  previousURL;

  constructor(private formBuilder:FormBuilder,
              private authService: AuthService,
              private router: Router,
              private authGuard:AuthGuard) {this.createForm ();}

  ngOnInit() {
    //check here if the requestURL exists and if it does, that means the the user was redirected, so send the user back
    if(this.authGuard.redirectURL){
      this.messageClass="alert alert-danger";
      this.message='You must be logged in to view that page';
      this.previousURL=this.authGuard.redirectURL;
      this.authGuard.redirectURL=undefined;

    }
  }

  messageClass;
  message;
  processing=false;
  form:FormGroup;

  createForm(){
    this.form=this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  // Function to submit form and login user
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(user).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        // Function to store user's token in client local storage
        this.authService.storeUserData(data.token, data.user);
        // After 2 seconds, redirect to dashboard page
        setTimeout(() => {
          if (this.previousURL){ //if the previous URL exists, we know that the user was redirected
              this.router.navigate([this.previousURL]);
          } else{
              this.router.navigate(['/dashboard']); // Navigate to dashboard view
          }
        }, 2000);
      }
    });
  }


}
