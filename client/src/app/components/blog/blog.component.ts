import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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



}
