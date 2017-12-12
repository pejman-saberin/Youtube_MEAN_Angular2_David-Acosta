import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  message;
  messageClass;
  newPost=false;
  loadingBlogs=false;
  form;
  processing=false;

  constructor(private formBuilder: FormBuilder) {
    this.createNewBlogForm(); //when component loads it creates the form for us
  }

  createNewBlogForm(){
    this.form=this.formBuilder.group({
      title:['',Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumricValidation
      ])],
      body:['',Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5),

      ])]
    })
  }

  enableFormNewBlogForm(){
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  // Disable new blog form
   disableFormNewBlogForm() {
     this.form.get('title').disable(); // Disable title field
     this.form.get('body').disable(); // Disable body field
   }

  //cusome validation
  alphaNumricValidation(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);// this is taken straight from the backend
    if(regExp.test(controls.value)){
      return null;
    } else{
      return {'alphaNumricValidation':true}
    }
  }

  ngOnInit() {
  }

  newBlogForm(){
    this.newPost=true;
  }
  reloadblogs(){
    this.loadingBlogs=true; //hide teh reload button for 4 seconds
    setTimeout(()=>{
      this.loadingBlogs=false;
    },4000);
  }

  draftComment(){

  }

  onBlogSubmit(){
    console.log('form submitted');
  }

  goBack(){
    window.location.reload(); //reloads the page
  }



}
