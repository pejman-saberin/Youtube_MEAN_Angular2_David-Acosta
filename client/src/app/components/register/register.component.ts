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
      email:['',Validators.required],  //you can use angular Validators or user your own
      username:['',Validators.required],
      password:['',Validators.required],
      confirm:['',Validators.required],
    })
  }

  onRegisterSubmit(){
    //console.log(this.form);

  }


}
