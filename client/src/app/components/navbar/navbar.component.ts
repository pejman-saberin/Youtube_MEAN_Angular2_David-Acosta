import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
//import {FlashMessagesService} from 'angular2-flash-messages'  //this is from video, didn't work
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router, private flashMessagesService:FlashMessagesService) { }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are now logged out!', {
      classes: ['alert-info'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });
    this.router.navigate(['/']);
  }

  ngOnInit() {

  }

}
