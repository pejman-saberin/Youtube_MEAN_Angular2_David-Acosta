import { Component, OnInit } from '@angular/core';
import{Location} from '@angular/common'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message=false;
  MessageClass;
  blog={
    title:String,
    body:String
  }
  processing=false;
  constructor() { }

  ngOnInit() {
  }

  updateBlogSubmit(){

  }

  goBack(){
    this.location.back();
  }

}
