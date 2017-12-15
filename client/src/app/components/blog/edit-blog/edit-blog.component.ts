import { Component, OnInit } from '@angular/core';
import{Location} from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router'; //this allows us to grab the URL from the  router
import {BlogService} from '../../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  MessageClass;
  // blog={
  //   title:String,
  //   body:String
  // }
  blog; //we just need this
  processing=false;
  currentUrl;
  loading=true;

  constructor(private location:Location
              private activatedRoute:ActivatedRoute,
              private blogService:BlogService,
              private router:Router) { }

  ngOnInit() {
    this.currentUrl=this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data=>{ //get the
      if (!data.success){
        this.messageClass='alert alert-danger';
        this.message='Blog not found.'
      }else {
        this.blog=data.blog
        this.loading=false;
      }
    })
  }

  // Function to Submit Update
  updateBlogSubmit() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.blogService.editBlog(this.blog).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/blog']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  goBack(){
    this.location.back();
  }

}
