import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup; //this allows us to access the form
  message;
  messageClass;
  processing=false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router) {
      this.createForm(); //everytime this component is generated, this form is automatically generated}
    }
    ngOnInit() {
    }


    createForm(){
      this.form=this.formBuilder.group({
        email:['',Validators.compose([  //adding an aray of Validators
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          this.validateEmail
        ])],  //you can use angular Validators or user your own
        username:['',Validators.compose([  //adding an aray of Validators
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          this.validateUsername
        ])],
        password:['',Validators.compose([  //adding an aray of Validators
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35),
          this.validatePassword
        ])],
        confirm:['',Validators.required]
      }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
    }

    disableForm(){
      this.form.controls['email'].disable();
      this.form.controls['username'].disable();
      this.form.controls['password'].disable();
      this.form.controls['confirm'].disable();
    }

    enableForm(){
      this.form.controls['email'].enable();
      this.form.controls['username'].enable();
      this.form.controls['password'].enable();
      this.form.controls['confirm'].enable();

    }

    // Function to validate e-mail is proper format
    validateEmail(controls) {
      // Create a regular expression
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      // Test email against regular expression
      if (regExp.test(controls.value)) {
        return null; // Return as valid email
      } else {
        return { 'validateEmail': true } // Return as invalid email.. validEmail is the name of the function
      }
    }

    // Function to validate username is proper format
    validateUsername(controls) {
      // Create a regular expression
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      // Test username against regular expression
      if (regExp.test(controls.value)) {
        return null; // Return as valid username
      } else {
        return { 'validateUsername': true } // Return as invalid username
      }
    }

    // Function to validate password
    validatePassword(controls) {
      // Create a regular expression
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      // Test password against regular expression
      if (regExp.test(controls.value)) {
        return null; // Return as valid password
      } else {
        return { 'validatePassword': true } // Return as invalid password
      }
    }

    // Funciton to ensure passwords match
    matchingPasswords(password, confirm) {
      return (group: FormGroup) => {
        // Check if both fields are the same
        if (group.controls[password].value === group.controls[confirm].value) {
          return null; // Return as a match
        } else {
          return { 'matchingPasswords': true } // Return as error: do not match
        }
      }
    }


    onRegisterSubmit(){
      //console.log(this.form);
      // console.log(this.form.get('email').value);  //form is the name of the form
      // console.log(this.form.get('username').value);  //form is the name of the form
      // console.log(this.form.get('password').value);  //form is the name of the form
      const user={
        email: this.form.get('email').value,
        username: this.form.get('username').value,
        password: this.form.get('password').value,
      }

      this.authService.registerUser(user).subscribe(data=>{
        this.processing=true; //
        this.disableForm();
        //console.log(data);//data is the response we are getting from the server
        if(!data.success){
          this.messageClass='alert alert-danger';
          this.message=data.message;
          this.processing=false;
          this.enableForm();
        }else{
          this.messageClass='alert alert-success';
          this.message=data.message;
          setTimeout(()=>{
            this.router.navigate(['./login']);  //reroute the user once logged in
          },2000)
        }
      })
    }


    // Function to check if e-mail is taken
   checkEmail() {
     // Function from authentication file to check if e-mail is taken
     this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
       // Check if success true or false was returned from API
       if (!data.success) {
         this.emailValid = false; // Return email as invalid
         this.emailMessage = data.message; // Return error message
       } else {
         this.emailValid = true; // Return email as valid
         this.emailMessage = data.message; // Return success message
       }
     });
   }

 // Function to check if username is available
   checkUsername() {
     console.log(this.form.get('username').value);
     // Function from authentication file to check if username is taken
     this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
       // Check if success true or success false was returned from API
       if (!data.success) {
         this.usernameValid = false; // Return username as invalid
         this.usernameMessage = data.message; // Return error message
       } else {
         this.usernameValid = true; // Return username as valid
         this.usernameMessage = data.message; // Return success message
       }
     });
   }






  }
