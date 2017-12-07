import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup; //this allows us to access the form

  constructor(private formBuilder:FormBuilder) {
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
        Validators.maxLength(15)
      ])],
      password:['',Validators.compose([  //adding an aray of Validators
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ])],
      confirm:['',Validators.compose([  //adding an aray of Validators
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ])],
    })
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

  onRegisterSubmit(){
    //console.log(this.form);

  }


}
