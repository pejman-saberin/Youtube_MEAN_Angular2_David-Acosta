import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Http,Headers,RequestOptions} from '@angular/http';


@Injectable()
export class BlogService {

  options;
  domain=this.authService.domain;

  constructor(private authService:AuthService, private http:Http) { }

  //copy and pasted below from  the auth service with small modification
  createAuthenticationHeaders(){
    this.authService.loadToken();
    this.options=new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  newBlog(blog){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain+'blogs/newBlog', blog, this.options).map(res=>res.json());
  }

  getAllBlogs(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain+'blogs/allBlogs', this.options).map(res=>res.json());
  }

  getSingleBlog(id){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain+'blogs/singleBlog/'+id, this.options).map(res=>res.json());
  }

  // Function to edit/update blog post
  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).map(res => res.json());
  }

  // Function to delete a blog
  deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).map(res => res.json());
  }

  // Function to like a blog post
  likeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/likeBlog/', blogData, this.options).map(res => res.json());
  }

  // Function to dislike a blog post
  dislikeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/dislikeBlog/', blogData, this.options).map(res => res.json());
  }






}
