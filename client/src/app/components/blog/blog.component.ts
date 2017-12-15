import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {BlogService} from '../../services/blog.service'



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
  username;
  blogPosts;

  constructor(private formBuilder: FormBuilder,
              private authService:AuthService,
              private blogService:BlogService) {
    this.createNewBlogForm(); //when component loads it creates the form for us
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile=>{
      this.username=profile.user.username;
    });
    this.getAllBlogs();
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


  newBlogForm(){
    this.newPost=true;
  }
  reloadBlogs(){
    this.loadingBlogs=true; //hide teh reload button for 4 seconds
    this.getAllBlogs();
    setTimeout(()=>{
      this.loadingBlogs=false;
    },4000);
  }

  draftComment(){

  }

  onBlogSubmit(){
    //console.log('form submitted');
    this.processing=true; //disables on submission
    this.disableFormNewBlogForm();

    const blog={
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy:this.username
    }
    this.blogService.newBlog(blog).subscribe(data=>{
      if(!data.success){
        this.messageClass='alert alert-danger';
        this.message=data.message;
        this.processing=false;
        this.enableFormNewBlogForm();
      } else{
        this.messageClass='alert alert-success';
        this.message=data.message;
        this.getAllBlogs();  //everytime a new blog is posted get all the blogs inclusing the new one
        setTimeout(()=>{
          this.newPost=false;
          this.processing=false;
          this.message=false;
          this.form.reset();
          this.enableFormNewBlogForm();
        },2000)
      }
    });
  }

  goBack(){
    window.location.reload(); //reloads the page
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(data=>{
      this.blogPosts=data.blogs;
    });
  }

  // Function to like a blog post
  likeBlog(id) {
    // Service to like a blog post
    this.blogService.likeBlog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs after like
    });
  }

  // Function to disliked a blog post
  dislikeBlog(id) {
    // Service to dislike a blog post
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs after dislike
    });
  }



}
