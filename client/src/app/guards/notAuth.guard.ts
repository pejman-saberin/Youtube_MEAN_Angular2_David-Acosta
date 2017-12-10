//this is copy paster with modificaiton from https://angular.io/guide/router section src/app/auth-guard.service.ts (v2)
import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(private authService:AuthService,
              private router: Router){}

  canActivate() {
    if(this.authService.loggedIn()){
      this.router.navigate(['/']);
      return false;
    }else {
      return true;
    }
  }
}
