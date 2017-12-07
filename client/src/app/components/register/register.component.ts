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
      email:'',
      username:'',
      password:'',
      confirm:''
    })
  }


}
